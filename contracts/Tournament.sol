pragma solidity ^0.5.0;

import "./HitchensUnorderedKeySet.sol";

/**
 * @title  A distributed tournament ledger
 * @author  James Richards
 * @notice  This is a pre-release work-in-progress.  Use at your own risk!
 *
 * A competitive tournament among a number of competitors who participate in matches.
 * Competitors may be individual athletes or teams of athletes.
 */
contract Tournament {
  using HitchensUnorderedKeySetLib for HitchensUnorderedKeySetLib.Set;

  string public title;
  string public startDateTime;
  string public endDateTime;
  MeasurementTypes public measurementType = MeasurementTypes.imperial;

  mapping(bytes32 => Athlete) public athletes;
  HitchensUnorderedKeySetLib.Set athletesRegistry;

  mapping(bytes32 => Person) public audience;
  HitchensUnorderedKeySetLib.Set audienceRegistry;

  mapping(bytes32 => Competitor) public competitors;
  HitchensUnorderedKeySetLib.Set competitorsRegistry;

  mapping(bytes32 => Division) public divisions;
  HitchensUnorderedKeySetLib.Set divisionsRegistry;
  mapping(bytes32 => HitchensUnorderedKeySetLib.Set) divisionCompetitorsRegistry;
  mapping(bytes32 => HitchensUnorderedKeySetLib.Set) divisionMatchesRegistry;

  mapping(bytes32 => Match) public matches;
  HitchensUnorderedKeySetLib.Set matchesRegistry;
  mapping(bytes32 => HitchensUnorderedKeySetLib.Set) matchesPenaltiesRegistry;

  mapping(bytes32 => Name) public names;
  HitchensUnorderedKeySetLib.Set namesRegistry;

  mapping(bytes32 => Person) public participants;
  HitchensUnorderedKeySetLib.Set participantsRegistry;

  mapping(bytes32 => Penalty) public penalties;
  HitchensUnorderedKeySetLib.Set penaltiesRegistry;

  mapping(bytes32 => Round) rounds;
  HitchensUnorderedKeySetLib.Set roundsRegistry;
  mapping(bytes32 => HitchensUnorderedKeySetLib.Set) matchRoundsRegistry;

  mapping(bytes32 => Rule) public rules;
  HitchensUnorderedKeySetLib.Set rulesRegistry;

  mapping(bytes32 => Sport) public sports;
  HitchensUnorderedKeySetLib.Set sportsRegistry;

  mapping(bytes32 => Person) public staff;
  HitchensUnorderedKeySetLib.Set staffRegistry;

  mapping(bytes32 => Team) public teams;
  HitchensUnorderedKeySetLib.Set teamsRegistry;

  mapping(bytes32 => Weight) public weights;
  HitchensUnorderedKeySetLib.Set weightsRegistry;

  address public admin;
  address public owner;
  uint idCounter;

  event AthleteAdded(bytes32 id, string name);
  event SportAdded(bytes32 id, string name);
  event RuleAdded(bytes32 id, string name);
  event DivisionAdded(bytes32 id, string name);
  event CompetitorAddedToDivision(bytes32 divisionId, bytes32 competitorId);
  event CompetitorRemovedFromDivision(bytes32 divisionId, bytes32 competitorId);
  event MatchAdded(bytes32 matchId, bytes32 divisionId);
  event MatchRemoved(bytes32 matchId, bytes32 divisionId);
  event PenaltyAdded(bytes32 penaltyId, bytes32 competitorId, uint256 cost);

  modifier onlyAdmin {
    require(msg.sender == admin, 'Only the tournament admin can execute');
    _;
  }

  modifier onlyOwner {
    require(msg.sender == owner, 'Only the tournament owner can execute');
    _;
  }

  /**
   * Builds a tournament assigning the msg.sender as the owner and admin of the tournament.
   */
  constructor() public {
      owner = msg.sender;
      admin = owner;
  }

  /**
   * Generates a new identifier as a bytes32 value that is suitable for uniquely identifying
   * all things within the tournament.
   *
   * @return bytes32  a unique identifier that remains unique for each subsequent call of this function
   */
  function newId() public returns (bytes32) {
    ++idCounter;
    return keccak256(abi.encodePacked(msg.sender, idCounter));
  }

  /**
   * Allows the owner of a tournament to specify an administrator responsible for executing
   * the actual matches of the tournament.
   *
   * @param newAdmin  address to assign administrative rights to
   */
  function setAdmin(address newAdmin) public onlyOwner {
    admin = newAdmin;
  }

  /**
   * Set the title of this tournament to a given name
   *
   * @param  newName  a name to set as the title of this tournament
   */
  function setTitle(string memory newName) public onlyAdmin {
    title = newName;
  }

  /**
   * ISO 8601 encoding of the start time of this tournament
   *
   * @param start  datetime when this tournament begins
   */
  function setStartDateTime(string memory start) public onlyAdmin {
    startDateTime = start;
  }


  /**
   * ISO 8601 encoding of the end time of this tournament
   *
   * @param end  datetime when this tournament ends
   */
  function setEndDateTime(string memory end) public onlyAdmin {
    endDateTime = end;
  }

  /**
   * Adds a sport to this tournament.  Tournaments may have competitions among multiple sports
   *
   * @param name  a particular, named sport, such as Judo
   * @param notes  arbitrary notes regarding the sport, such as brief history or detailed description
   * @return bytes32  uniquely identifying the created sport
   */
  function addSport(string memory name, string memory notes) public onlyAdmin
      returns (bytes32) {
    bytes32 spId = this.newId();
    sportsRegistry.insert(spId);
    Sport storage sp = sports[spId];
    sp.id = spId;
    sp.name = name;
    sp.notes = notes;
    emit SportAdded(sp.id, sp.name);
    return sp.id;
  }

  /**
   * Creates a rule for the tournament or a particular sport or division, such as cleanliness requirements,
   * or weight limitations for a division
   *
   * @param name  human friendly name of the rule
   * @param description  detailed description of the rule
   * @return bytes32  uniquely identifying the created rule
   */
  function addRule(string memory name, string memory description) public onlyAdmin
      returns (bytes32) {
    bytes32 rlId = this.newId();
    rulesRegistry.insert(rlId);
    Rule storage rl = rules[rlId];
    rl.id = rlId;
    rl.name = name;
    rl.description = description;
    emit RuleAdded(rl.id, rl.name);
    return rl.id;
  }

  /**
   * Adds an athlete to the list of competitors of this tournament.
   *
   * @param firstName  of the athlete
   * @param middleName  of the athlete
   * @param lastName  of the athlete
   * @param weightMajor  the major unit of the athlete's weight, such as 100 pounds
   * @param weightMinor  the minor unit of the athlete's weight, such as 5 ounces
   * @param heightMajor  the major unit of the athlete's height, such as 5 feet
   * @param heightMinor  the minor unit of the athlete's height, such as 9 inches
   * @return bytes32  uniquely identifying the created athlete
   */
  function addAthlete(string memory firstName, string memory middleName, string memory lastName,
          uint8 weightMajor, uint8 weightMinor, uint8 heightMajor, uint8 heightMinor)
        public onlyAdmin
      returns (bytes32) {
        bytes32 athId = this.newId();

        namesRegistry.insert(athId);
        participantsRegistry.insert(athId);
        athletesRegistry.insert(athId);
        competitorsRegistry.insert(athId);
        Name memory nm = Name({id: athId, first: firstName, middle: middleName, last: lastName});
        Person memory psn = Person({id: athId, name: athId, title: 'Athlete', notes: '', role: PersonRoles.competitor});
        Athlete memory ath = Athlete({person: athId, weightMajor: weightMajor, weightMinor: weightMinor,
          heightMajor: heightMajor, heightMinor: heightMinor});
        Competitor memory cmp = Competitor({ id: athId, typeOf: CompetitorTypes.athlete });
        participants[athId] = psn;
        names[athId] = nm;
        competitors[athId] = cmp;
        athletes[athId] = ath;

        emit AthleteAdded(athId, string(abi.encodePacked(nm.first,' ', nm.last)));
        return ath.person;
  }

  /**
   * Adds a division for a particular weight range to this tournament
   *
   * @param name  of the division
   * @param notes  additional information on the division
   * @param sportId  of the sport competed upon within this division
   * @param weightMajor  the major unit of the maximum weight a competitor may be to compete within this division
   * @param weightMinor  the minor unit of the maximum weight a competitor may be to compete within this division
   * @return bytes32  uniquely identifying the created division
   */
  function addDivision(string memory name, string memory notes, bytes32 sportId, uint8 weightMajor, uint8 weightMinor)
      public onlyAdmin
    returns (bytes32) {
      bytes32 divId = this.newId();
      bytes32 wgtId = this.newId();

      weightsRegistry.insert(wgtId);
      Weight storage wgt = weights[wgtId];
      wgt.id = wgtId;
      wgt.major = weightMajor;
      wgt.minor = weightMinor;

      divisionsRegistry.insert(divId);
      Division storage div = divisions[divId];
      div.id = divId;
      div.name = name;
      div.notes = notes;
      div.sport = sportId;
      div.weightClass = wgtId;

      emit DivisionAdded(divId, name);
      return divId;
  }

  /**
   * Adds a given identified competitor to a given identified division, with the requirements that
   * both the competitor and division exist and the competitor is not already a member of the division
   */
  function addCompetitor(bytes32 divisionId, bytes32 competitorId)
      public onlyAdmin
    returns (bool) {
      require(divisionsRegistry.exists(divisionId), "The identified division must exist.");
      require(competitorsRegistry.exists(competitorId), "The identified competitor must exist.");
      require(!divisionCompetitorsRegistry[divisionId].exists(competitorId), "Competitor is already a member of the division.");
      divisionCompetitorsRegistry[divisionId].insert(competitorId);

      emit CompetitorAddedToDivision(divisionId, competitorId);
      return divisionCompetitorsRegistry[divisionId].exists(competitorId);
  }

  /**
   * Removes a given identified competitor from a given identified division, with the requirements that
   * both the competitor and division exist and the competitor is already a member of the division
   */
  function removeCompetitor(bytes32 divisionId, bytes32 competitorId)
      public onlyAdmin
    returns (bool) {
      require(divisionsRegistry.exists(divisionId), "The identified division must exist.");
      require(competitorsRegistry.exists(competitorId), "The identified competitor must exist.");
      require(divisionCompetitorsRegistry[divisionId].exists(competitorId), "Competitor is not already a member of the division.");
      divisionCompetitorsRegistry[divisionId].remove(competitorId);

      emit CompetitorRemovedFromDivision(divisionId, competitorId);
      return !divisionCompetitorsRegistry[divisionId].exists(competitorId);
  }

  /**
   * Conditional indicating that a given identified competitor is a member of a given identified division
   */
  function hasCompetitor(bytes32 divisionId, bytes32 competitorId)
      public view onlyAdmin
    returns (bool) {
      return divisionCompetitorsRegistry[divisionId].exists(competitorId);
  }

  /**
   * Adds a match of a defined duration with initial notes to a given division with a given set of two or more competitors.
   */
  function addMatch(bytes32 divisionId, bytes32[] memory comps, string memory duration, string memory notes)
      public onlyAdmin
    returns (bytes32) {
    require(divisionsRegistry.exists(divisionId), "The identified division must exist.");
    require(comps.length >= 2, "At least two competitors are required for a match.");

    bytes32 mtchId = this.newId();
    matchesRegistry.insert(mtchId);

    Match storage mtch = matches[mtchId];
    mtch.competitors = comps;
    mtch.division = divisionId;
    mtch.duration = duration;
    mtch.notes = notes;
    divisionMatchesRegistry[divisionId].insert(mtchId);

    emit MatchAdded(mtchId, divisionId);
    return mtchId;
  }

  /**
   * Removes an identified match from the set of matches.
   */
  function removeMatch(bytes32 matchId, bytes32 divisionId) public onlyAdmin returns (bool) {
    require(matchesRegistry.exists(matchId), "The identified match must exist.");
    require(divisionMatchesRegistry[divisionId].exists(matchId), "The identified match is not within the identified division.");

    Match storage mtch = matches[matchId];
    bytes32 divId = mtch.division;
    matchesRegistry.remove(matchId);
    divisionMatchesRegistry[divisionId].remove(matchId);

    emit MatchRemoved(matchId, divId);
    return true;
  }

  /**
   * Conditional indicating that a given identified match is a member of a given identified division
   */
  function hasMatch(bytes32 matchId, bytes32 divisionId) public view onlyAdmin returns (bool) {
    if (!matchesRegistry.exists(matchId)) {
      return false;
    }
    return divisionMatchesRegistry[divisionId].exists(matchId);
  }

  function getCompetitors(bytes32 matchId) public view onlyAdmin returns (bytes32[] memory) {
    // require(matchesRegistry.exists(matchId), "The identified match must exist.");
    return matches[matchId].competitors;
  }

  function addPenalty(bytes32 matchId, bytes32 ruleId, uint256 cost, bytes32 competitorId) public onlyAdmin returns (bool) {
    require(rulesRegistry.exists(ruleId), "The identified rule must exist.");
    require(matchesRegistry.exists(matchId), "The identified match must exist.");
    require(competitorsRegistry.exists(competitorId), "The identified competitor must exist.");

    bytes32 pnId = this.newId();
    Penalty storage pen = penalties[pnId];
    pen.rule = ruleId;
    pen.cost = cost;
    pen.offender = competitorId;
    pen.matchId = matchId;
    penaltiesRegistry.insert(pnId);
    matchesPenaltiesRegistry[matchId].insert(pnId);

    emit PenaltyAdded(pnId, competitorId, cost);
    return true;
  }

  function hasPenalty(bytes32 matchId, bytes32 penaltyId) public view onlyAdmin returns (bool) {
    require(matchesRegistry.exists(matchId), "The identified match must exist.");
    require(penaltiesRegistry.exists(penaltyId), "The identified penalty must exist.");

    return matchesPenaltiesRegistry[matchId].exists(penaltyId);
  }

  /**
   * An athlete is a single person who competes
   */
  struct Athlete {
    bytes32 person;
    uint8 weightMajor;
    uint8 weightMinor;
    uint8 heightMajor;
    uint8 heightMinor;
  }

  enum CompetitorTypes { athlete, team }

  /**
   * A competitor is a group of two or more athletes who collectively compete against other teams.
   */
  struct Competitor {
    bytes32 id;
    CompetitorTypes typeOf;
  }

  /**
   * A division within the tournament for a particular set of competitors, such as competitors within a particular weight class
   */
  struct Division {
    bytes32 id;
    bytes32 sport;
    string name;
    string notes;
    bytes32 weightClass;
  }

  /**
   * The types of measurement units that height/weight are valued in
   */
  enum MeasurementTypes { imperial, metric }

  /**
   * The height of an athlete in imperial or metric units
   */
  struct Height {
    uint8 major;
    uint8 minor;
  }

  /**
   * A match between competitors who may accumulate points within rounds, penalties from rule violations
   * or may be disqualified or unable to continue the competition, i.e. due to injury or emergency
   */
  struct Match {
    string duration;
    string notes;
    bytes32 division;
    bytes32[] competitors;
    bytes32 disqualification;
    bytes32 discontinuance;
  }

  /**
   * A person name which may have at most three parts
   */
  struct Name {
    bytes32 id;
    string first;
    string middle;
    string last;
  }

  /**
   * A violation of a rule for a competition match by an offending Competitor
   */
  struct Penalty {
    bytes32 rule;
    uint256 cost;
    bytes32 matchId;
    bytes32 offender;
  }

  /**
   * The roles which people associated with a tournament may perform
   */
  enum PersonRoles { coach, competitor, judge, referee, medical, other, security }

  /**
   * An individual capable of competing in a tournament
   */
  struct Person {
    bytes32 id;
    bytes32 name;
    string title;
    string notes;
    PersonRoles role;
  }

  /**
   * A round within a match with numerical scores mapped to competitor identifiers
   */
  struct Round {
    bytes32 id;
    mapping(bytes32 => uint256) scores;
  }

  /**
   * A rule governing a sport within a tournament
   */
  struct Rule {
    bytes32 id;
    string name;
    string description;
  }

  /**
   * A competitive Sport such as shuai jiao or baseball in which competitors attempt to gain the highest score
   * to win matches
   */
  struct Sport {
    bytes32 id;
    string name;
    string notes;
  }

  /**
   * A group of two or more athletes who collectively compete against other teams
   */
  struct Team {
    bytes32 id;
    bytes32 name;
    bytes32[] members;
    bytes32[] coaches;
  }

  /**
   * A specific weight under a supported unit of weight measurement
   */
  struct Weight {
    bytes32 id;
    uint8 major;
    uint8 minor;
  }
}