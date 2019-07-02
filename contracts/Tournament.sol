pragma solidity ^0.5.0;

import "./HitchensUnorderedKeySet.sol";

/**
 * A competitive tournament among a number of competitors who participate in matches.
 * Competitors may be individual athletes or teams of athletes.
 */
contract Tournament {
  using HitchensUnorderedKeySetLib for HitchensUnorderedKeySetLib.Set;

  string public title;
  string public startDateTime;
  string public endDateTime;
  MeasurementTypes public measurementType = MeasurementTypes.imperial;
  
  mapping(bytes32 => Sport) public sports;
  HitchensUnorderedKeySetLib.Set sportsRegistry;

  mapping(bytes32 => Person) staff;
  HitchensUnorderedKeySetLib.Set staffRegistry;

  mapping(bytes32 => Athlete) public athletes;
  HitchensUnorderedKeySetLib.Set athletesRegistry;

  mapping(bytes32 => Name) public names;
  HitchensUnorderedKeySetLib.Set namesRegistry;

  mapping(bytes32 => Team) public teams;
  HitchensUnorderedKeySetLib.Set teamsRegistry;

  mapping(bytes32 => Competitor) public competitors;
  HitchensUnorderedKeySetLib.Set competitorsRegistry;

  mapping(bytes32 => Person) public participants;
  HitchensUnorderedKeySetLib.Set participantsRegistry;

  mapping(bytes32 => Person) public audience;
  HitchensUnorderedKeySetLib.Set audienceRegistry;

  mapping(bytes32 => Division) divisions;
  HitchensUnorderedKeySetLib.Set divisionsRegistry;

  mapping(bytes32 => Rule) public rules;
  HitchensUnorderedKeySetLib.Set rulesRegistry;

  mapping(bytes32 => Match) public matches;
  HitchensUnorderedKeySetLib.Set matchesRegistry;

  address public admin;
  address public owner;
  uint idCounter;

  event AthleteAdded(bytes32 id, string name);
  event SportAdded(bytes32 id, string name);
  event RuleAdded(bytes32 id, string name);

  modifier onlyAdmin {
    require(msg.sender == admin, 'Only the tournament admin can execute');
    _;
  }

  modifier onlyOwner {
    require(msg.sender == owner, 'Only the tournament owner can execute');
    _;
  }

  constructor() public {
      owner = msg.sender;
      admin = owner;
  }

  function newId() public returns (bytes32) {
    ++idCounter;
    return keccak256(abi.encodePacked(msg.sender, idCounter));
  }

  /**
   * Allows the owner of a tournament to specify an administrator responsible for executing
   * the actual matches of the tournament
   */
  function setAdmin(address newAdmin) public onlyOwner {
    admin = newAdmin;
  }

  /**
   * Set the title of this tournament to a given name
   */
  function setTitle(string memory newName) public onlyAdmin {
    title = newName;
  }

  function setStartDateTime(string memory start) public onlyAdmin {
    startDateTime = start;
  }

  function setEndDateTime(string memory end) public onlyAdmin {
    endDateTime = end;
  }

  /**
   * Adds a sport to this tournament
   */
  function addSport(string memory name, string memory notes) public onlyAdmin
      returns (bytes32) {
    bytes32 spId = this.newId();
    sportsRegistry.insert(spId);
    Sport memory sp = Sport({id: spId, name: name, notes: notes});
    sports[sp.id] = sp;
    emit SportAdded(sp.id, sp.name);
    return sp.id;
  }

  /**
   * Creates a rule for a sport's division
   */
  function addRule(string memory name, string memory description) public onlyAdmin
      returns (bytes32) {
    bytes32 rlId = this.newId();
    rulesRegistry.insert(rlId);
    Rule memory rl = Rule({id: rlId, name: name, description: description});
    rules[rl.id] = rl;
    emit RuleAdded(rl.id, rl.name);
    return rl.id;
  }

  /**
   * Adds an athlete to the list of competitors of this tournament
   */
  function addAthlete(string memory firstName, string memory middleName, string memory lastName,
        uint8 weightMajor, uint8 weightMinor,
        uint8 heightMajor, uint8 heightMinor) public onlyAdmin
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
   * A division within the tournament for a particular set of competitors, such a competitors within a particular weight class
   */
  struct Division {
    bytes32 id;
    bytes32 sport;
    string name;
    string notes;
    Weight minimum;
    Weight maximum;
    bytes32[] competitors;
    bytes32[] rules;
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
    bytes32[] rounds;
    bytes32[] penalties;
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
    Rule rule;
    uint256 cost;
    Competitor offender;
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
    mapping(string => uint256) scores;
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
    uint8 major;
    uint8 minor;
  }
}