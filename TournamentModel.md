# TournamentBlocks MSON Structure
A document describing a tournament consisting of matches between competitors judged by a set of rules with a bracketed outcome from 
one or more matches played between two or more competitors.

## Tournament (object)
A tournament with two or more participants capable of being scheduled.
### Properties
- `title` (string) - The name by which the tournament is publicly known.
- `startDateTime` (string) - ISO 8601 encoding of the start date/time of the tournament.
- `endDateTime` (string) - ISO 8601 encoding of the end date/time of the tournament.
- `participants` (array[Person]) - All the people officially participating in a tournament, exclusive of people observing but not participating
- `audience` (array[Person]) - People attending the tournament but not participating 
- `divisions` (array[Division[]]) - The divisions hosted by this tournament
- `matches` (array[Match[]]) - All matches of this tournament


## Person (object)
Base type for humans involved in the tournament as competitors or as judges/referees/other personnel.

### Properties
- `name` ([Name][])
- `title` (string) - a specific title for a person, such as 'ring announcer' or 'head coach' or 'assistant coach'
- `notes` (string)
- `type` (enum[string])
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

## Athlete (object)
An athlete is a single human competitor

### Properties 
- Include Person
- `weight` ([Weight][], required)
- `height` ([Height][])
- `position` (string) - A specific position a competitor may have within a team oriented competition, such as quarterback or pitcher

## Competitor (object)
A competitor within a tournament is one who competes in matches against other competitors

### Properties 
- One of
  - `athlete` ([Athlete][]) - A competitor who is a single athlete
  - `team` ([Team][]) - A competitor who is a team of athletes
- `coaches` (array[[Person][]]) - One or more coaches associated with the competitor  

## Team (object)
A team is a group of one or more competitors possibly with one or more coaches
- `members` (array[[Competitor][]], required) - The members of the team

## WeightType (object) 
The type of weight measurement used by the tournament

### Properties
- unitType (enum[string])
  - `pounds` (default)
  - `kilograms`

## Weight (object)
The weight of a competitor, used to classify which divisions a competitor is qualified to compete within

### Properties
- type ([WeightType][], required)
- value (number, required)

## Height (object)
The height of a competitor

### Properties
- type (enum[string])
  - `imperial` (default) - The imperial system of measurement using feet and inches
  - `metric` - The metric system of measurement using meters and centimeters
- major (number) - The major height component, such as 5 feet
- minor (number) - The minor height component, such as 7 inches

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
- `left` ([Competitor][]) - A competitor competing against the 'right' hand competitor
- `right` ([Competitor][]) - A competitor competing against the 'left' hand competitor
- `leftScore` (number) - The cumulative points earned for this match by the left player
- `rightScore` (number) - The cumulative points earned for this match by the right player
- `penalties` (array[Penalty][]) - The set of all penalties by either competitor
- `disqualification` ([Penalty][]) - A competitor who was disqualified from a match entirely due to a rule violation
- `discontinuance` ([Competitor][]) - A case where one competitor was unable to continue competition due to injury or yielding to the other competitor

## Penalty
A penalty is a violation of rule or conduct which causes a loss of points or disqualification from a competition

### Properties 
- `rule` ([Rule][], required) - The rule violated to cause the penalty
- `cost` (number) - The numeric cost of the penalty, if applicable
- `offender` ([Competitor][]) - The competitor who committed the breach of a rule