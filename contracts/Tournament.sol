pragma solidity ^0.5.0;

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

  enum PersonTypes { coach, competitor, judge, referee, medical, other, security }

  struct Person {
    Name name;
    string title;
    string notes;
    PersonTypes role;
  }

  struct Team {
    Name name;
    Athlete[] members;
    Person[] coaches;
  }

  enum WeightTypes { kilograms, pounds }

  struct Weight {
    WeightTypes unit;
    uint8 value;
  }

  constructor() public {
      // NYI
  }
}