pragma solidity ^0.5.0;

/**
 * A competitive tournament among a number of competitors who participate in matches.
 * Competitors may be individual athletes or teams of athletes.
 */
contract Tournament {
  string public title;
  string public startDateTime;
  string public endDateTime;
  MeasurementTypes public measurementType = MeasurementTypes.imperial;
  mapping(bytes32 => Sport) public sports;
  mapping(bytes32 => Athlete) public athletes;
  mapping(bytes32 => Name) public names;
  mapping(bytes32 => Team) teams;
  mapping(bytes32 => Competitor) public competitors;
  mapping(bytes32 => Person) people;
  mapping(bytes32 => Person) participants;
  mapping(bytes32 => Person) audience;
  mapping(bytes32 => Division) divisions;
  mapping(bytes32 => Rule) public rules;

  address public admin;
  address public owner;
  uint idCounter;

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

  /**
   * Adds a sport to this tournament
   */
  function addSport(string memory name, string memory notes) public onlyAdmin
      returns (bytes32) {
    Sport memory sp = Sport({id: this.newId(), name: name, notes: notes});
    sports[sp.id] = sp;
    return sp.id;
  }

  /**
   * Creates a rule for a sport's division
   */
  function addRule(string memory name, string memory description) public onlyAdmin
      returns (bytes32) {
    Rule memory rl = Rule({id: this.newId(), name: name, description: description});
    rules[rl.id] = rl;
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
        Name memory nm = Name({id: athId, first: firstName, middle: middleName, last: lastName});
        Person memory psn = Person({id: athId, name: athId, title: 'Athlete', notes: '', role: PersonRoles.competitor});
        Athlete memory ath = Athlete({person: athId, weightMajor: weightMajor, weightMinor: weightMinor,
          heightMajor: heightMajor, heightMinor: heightMinor});
        Competitor memory cmp = Competitor({ id: athId, typeOf: CompetitorTypes.athlete });
        people[athId] = psn;
        names[athId] = nm;
        competitors[athId] = cmp;
        athletes[athId] = ath;
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
    Sport sport;
    string name;
    string notes;
    Weight minimum;
    Weight maximum;
    Competitor[] competitors;
    Rule[] rules;
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
    Division division;
    Competitor[] competitors;
    Round[] rounds;
    Penalty[] penalties;
    Penalty disqualification;
    Competitor discontinuance;
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
    Name name;
    Athlete[] members;
    Person[] coaches;
  }

  /**
   * A specific weight under a supported unit of weight measurement
   */
  struct Weight {
    uint8 major;
    uint8 minor;
  }
}