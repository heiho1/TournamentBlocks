pragma solidity ^0.5.0;

/**
 * A competitive tournament among a number of competitors who participate in matches.
 * Competitors may be individual athletes or teams of athletes.
 */
contract Tournament {
  string public title;
  string public startDateTime;
  string public endDateTime;

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
   * The types of supported height measurements
   */
  enum HeightTypes { imperial, metric }

  struct Height {
    HeightTypes unit;
    uint8 major;
    uint8 minor;
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
   * The roles which people associated with a tournament may perform
   */
  enum PersonRoles { coach, competitor, judge, referee, medical, other, security }

  /**
   * An individual capable of competing in a tournament
   */
  struct Person {
    Name name;
    string title;
    string notes;
    PersonRoles role;
  }

  /**
   * A group of two or more athletes who collectively compete against other teams
   */
  struct Team {
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

  constructor() public {
      // NYI
  }
}