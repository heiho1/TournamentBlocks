# Design Pattern Decisions

1. A tournament is a complex set of compositional elements and may change frequently as matches are added, updated and cancelled.  For this reason a CRUD implementation library supporting set semantics was chosen to allow tournament administration.  The Solidity CRUD pattern rationale is described in detail at https://github.com/rob-Hitchens/UnorderedKeySet

2. Tournaments are inherently composite tree structures and so the Composite pattern is a conscious design goal: https://www.geeksforgeeks.org/composite-design-pattern/

3. A circuit breaker design pattern was a project requirement.  This was implemented as a boolean flag that disables all tournament
administrative functions via a common modifier.  

4. Access Restriction [https://solidity.readthedocs.io/en/v0.4.24/common-patterns.html#restricting-access] as a pattern was applied by defining two primary, distinct types of contract users: owner and admin.  Currently the only powers granted to the owner are to delegate 
administration to another address and the ability to circuit break or unbreak the contract operations.

5. State Machines [https://solidity.readthedocs.io/en/v0.4.24/common-patterns.html#state-machine] is a future design goal of the application.  Tournaments are either not started, ongoing or have ended.  Similarly matches may be not started, ongoing or ended.  It would be useful to consumers of tournaments to know such state transitions.

6. Role Object pattern [https://hillside.net/plop/plop97/Proceedings/riehle.pdf] is contemplated in the design by the addition of a PersonRoles enumeration.  This raises the possibility of participants within a tournament filling defined roles that offer them specialized functionality and views on the data.  This is a future implementation goal.
