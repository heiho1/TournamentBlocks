# TournamentBlocks MSON Structure
A document describing a tournament consisting of matches between competitors judged by a set of rules with a bracketed outcome from 
one or more matches played between two or more competitors.

## Tournament (object)
A tournament with two or more participants capable of being scheduled.
### Properties
- `title` (string) - The name by which the tournament is publicly known.
- `startDateTime` (string) - ISO 8601 encoding of the start date/time of the tournament.
- `endDateTime` (string) - ISO 8601 encoding of the end date/time of the tournament.
- `measurementType` ([MeasurementTypes][]) - the type of measurement units used by the tournament, such as imperial or metric
- `competitors` (array[Competitor][])
- `participants` (array[Person][]) - All the people officially participating in a tournament as athletes
- `teams` (array[Team][]) - All the teams officially participating in a tournament
- `staff` (array[Person][]) - People who contribute the tournament in a non-competitive role, such as security, referees or doctors
- `audience` (array[Person][]) - People attending the tournament but not participating 
- `divisions` (array[Division][]) - The divisions hosted by this tournament
- `matches` (array[Match][]) - All matches of this tournament

## Person (object)
Base type for humans involved in the tournament as competitors or as judges/referees/other personnel.

### Properties
- `name` ([Name][])
- `title` (string) - a specific title for a person, such as 'ring announcer' or 'head coach' or 'assistant coach'
- `notes` (string)
- `role` (enum[string])
  - `competitor` (default) - A competitor within a tournament
  - `referee` - A referee responsible for ensuring proper competitor conduct and safety
  - `judge` - A judge responsible for determining the outcome of competitive matches based upon rules and penalties of the type of  competition
  - `coach` - A coach trains competitors for competition and may assist them during competition
  - `medical` - A medical doctor or other health professional responsible for the physical safety of the competitors
  - `security` - A security professional responsible for the general safety of tournament attendees
  - `other` - Any type of person associated with a tournament who does not fall within another enumerated type

## Name (object)
A complex name containing one or more parts such as first, middle and last

### Properties
- `first` (string)
- `middle` (string)
- `last` (string)

## MeasurementTypes (object) 
The type of measurement units used by the tournament

### Properties
- unit (enum[string])
  - `imperial` (default)
  - `metric`

## Athlete (object)
An athlete is a single human competitor

### Properties 
- Include Person
- `weightMajor` (int, required) - The major unit of weight, such as 145 pounds
- `weightMinor` (int) - The minor unit of weight, such as 3 ounces
- `heightMajor` (int) - The major unit of height, such as 5 feet
- `heightMinor` (int) - The minor unit of height, such as 9 inches
- `position` (string) - A specific position a competitor may have within a team oriented competition, such as quarterback or pitcher

## CompetitorTypes (object) 
The type of a competitor, such as an individual athlete or a team.

### Properties
- unit (enum[string])
  - `athlete` (default)
  - `team`

## Competitor (object)
A competitor within a tournament is one who competes in matches against other competitors

### Properties 
- `id` (bytes32) - The identifier of the related type of competitor, i.e. a team id or an athlete id
- `typeOf` ([CompetitorTypes][])

## Team (object)
A team is a group of one or more Atheletes possibly with one or more coaches
- `name` (string) - The name by which the team is collectively known
- `members` (array[[Atheletes][]], required) - The competitive members of the team
- `coaches` (array[Person][]) - One or more coaches of the team

## Weight (object)
The weight of a competitor, used to classify which divisions a competitor is qualified to compete within

### Properties
- `major` (number, required) - The major height component, such as 5 feet
- `minor` (number) - The minor height component, such as 7 inches

## Height (object)
The height of a competitor

### Properties
- `major` (number, required) - The major height component, such as 5 feet
- `minor` (number) - The minor height component, such as 7 inches

## Sport
A competitive sport for which one or more matches within a tournament are held

### Properties 
- `name` (string) - The name of the sport, such as shuai jiao, jujitsu, hockey, soccer
- `notes` (string) - General information on the sport
- `rules` (array[[Rule][]]) - The rules required of competitors within a sport

## Division
A division within a sport used to separate competitors within weight classes, such as bantam weight or heavy weight
- `sport` ([Sport][]) - The sport for which a division applies
- `name` (string, required) - A common name for the division, such as heavyweight
- `notes` (string) - Descriptive comments regarding this particular division
- `minimum` ([Weight][]) - The lower bound for the weight class
- `maximum` ([Weight][]) - The upper bound for the weight class
- `competitors` ([Competitor][]) - The competitors within this tournament division

## Rule
A rule governing a sport, such as uniform requirements or rules of fair play

### Properties
- `name` (string, required) - A human readable description of the rule
- `description` (string) - A more detailed description of the rule

## Match (object) 
A match is between two competitors, who may be teams, where the 'left' and 'right' hand competitors are arbitrary.  In single person matches, the left and right simply refer to where the competitors stand in relation to their referee at the start of competition.

### Properties
- `duration` (string) - ISO 8601 encoding of the cumulative duration of this match
- `notes` (string) - General notes on the match such as why the match was discontinued
- `division` ([Division][]) - The division to which a match belongs
- `competitors` array[Competitor][]) - The competitors in this match
- `penalties` (array[Penalty][]) - The set of all penalties by either competitor
- `disqualification` ([Penalty][]) - A competitor who was disqualified from a match entirely due to a rule violation
- `discontinuance` ([Competitor][]) - A case where one competitor was unable to continue competition due to injury or yielding to the other competitor
- `rounds` ([Round][]) - One or more rounds of this match upon which scoring has been applied

## Round (object)
A round between competitors within a match, such as the rounds of a boxing match or the quarters of a basketball game

### Properties
- `scores` (mapping) - The cumulative points earned for this Round by the competitors
  - `key` (string) - A competitor id
  - `value` (number) - A competitor score

## Penalty
A penalty is a violation of rule or conduct which causes a loss of points or disqualification from a competition

### Properties 
- `rule` ([Rule][], required) - The rule violated to cause the penalty
- `cost` (number) - The numeric cost of the penalty, if applicable
- `offender` ([Competitor][]) - The competitor who committed the breach of a rule