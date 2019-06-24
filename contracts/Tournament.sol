pragma solidity ^0.5.0;

/**
 * A competitive tournament among a number of competitors who participate in matches.
 * Competitors may be individual athletes or teams of athletes.
 */
contract Tournament {
  string public title;
  string public startDateTime;
  string public endDateTime;
  mapping(bytes32 => Sport) public sports;
  mapping(bytes32 => Competitor) competitors;
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
   * Creates a rule for an sport's division
   */
  function newRule(string memory name, string memory description) public onlyAdmin
      returns (bytes32) {
    Rule memory rl = Rule({id: this.newId(), name: name, description: description});
    rules[rl.id] = rl;
    return rl.id;
  }

  /**
   * An athlete is a single person who competes
   */
  struct Athlete {
    Person person;
    Weight weight;
    Height height;
  }

  /**
   * A competitor is a group of two or more athletes who collectively compete against other teams.
   */
  struct Competitor {
    Team team;
    Athlete athlete;
    Person[] coaches;
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
   * The types of supported height measurements
   */
  enum HeightTypes { imperial, metric }

  /**
   * The height of an athlete in imperial or metric units
   */
  struct Height {
    HeightTypes unit;
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
    Name name;
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
   * The unit of measurement used for specifying weights in a tournament
   */
  enum WeightTypes { imperial, metric }

  /**
   * A specific weight under a supported unit of weight measurement
   */
  struct Weight {
    WeightTypes unit;
    uint8 major;
    uint8 minor;
  }
}