const Tournament = artifacts.require('Tournament');
const truffleAssert = require('truffle-assertions');

contract('TournamentTests', function(accounts) {
    const TOURNAMENT_NAME = 'Shuai Jiao Tournament';
    let tournament;

    it('Tournament can be deployed and given a title', function() {
      console.log(accounts);

      return Tournament.deployed().then(function(instance) {
        console.log('Main contract:' + instance.address);
        tournament = instance;
        tournament.setTitle(TOURNAMENT_NAME);
      }).then(async function() {
        let title = await tournament.title.call();
        assert.equal(title, TOURNAMENT_NAME);
      });
    });

    it('Tournament can have a start and end datetime', async function() {
      const start = '2019-06-28T09:00:00';
      const end = '2019-06-28T16:00:00';
      await tournament.setStartDateTime(start);
      await tournament.setEndDateTime(end);

      let tStart = await tournament.startDateTime.call();
      let tEnd = await tournament.endDateTime.call();

      assert.equal(start, tStart);
      assert.equal(end, tEnd);
    });

    it ('Tournament can be circuit broken and restarted', async function() {
      const title = 'A tournament to stop';
      await tournament.setTitle(title);
      let checkTitle = await tournament.title.call();
      assert.equal(title, checkTitle);
      await tournament.stop();
      await truffleAssert.reverts(
        tournament.setTitle(title + ' foo'),
        'This tournament has been stopped.'
      );
      checkTitle = await tournament.title.call();
      assert.equal(title, checkTitle);
      await tournament.start();
      await tournament.setTitle(title + ' foo');
      checkTitle = await tournament.title.call();
      assert.equal(title + ' foo', checkTitle);      
    });

    it('Tournament details may be set in aggregate', async function() {
      const title = 'Rogue One';
      const start = '2020-06-28T09:00:00';
      const end = '2020-06-28T16:00:00';

      await tournament.setDetails(title, start, end);

      let tTitle = await tournament.title.call();
      let tStart = await tournament.startDateTime.call();
      let tEnd = await tournament.endDateTime.call();

      assert.equal(title, tTitle);
      assert.equal(start, tStart);
      assert.equal(end, tEnd);
    });

    it('Tournament has an owner and an admin', async function() {
      let owner = await tournament.owner.call();
      let admin = await tournament.admin.call();
      assert.equal(owner, accounts[0]);
      assert.equal(admin, accounts[0]);
    });

    it('An identifier can be generated', async function() {
      let id = await tournament.newId.call();
      assert.exists(id);
    });

    it('A sport may be added', async function() {
      let tx = await tournament.addSport('Shuai Jiao', 'Chinese Wrestling');
      assert.equal('SportAdded', tx.logs[0].event);
      let id = tx.logs[0].args[0]; // get the id from the event
      let sport = await tournament.sports.call(id);
      assert.equal('Shuai Jiao', sport.name);
    });

    it('A rule may be added', async function() {
      let tx = await tournament.addRule('Overall Cleanliness', 'Free of odor with no open wounds or infections.');
      assert.equal('RuleAdded', tx.logs[0].event);
      let id = tx.logs[0].args[0]; // get the id from the event
      let rule = await tournament.rules.call(id);
      assert.equal('Overall Cleanliness', rule.name);
    });
  
    it('An athlete may be added as a competitor', async () => {
      let tx = await tournament.addAthlete('Folly', 'Aux', 'Deux', 130, 5, 5, 8);
      let id = tx.logs[0].args[0];
      let ath = await tournament.athletes.call(id);
      assert.equal(id, ath.person);
      let comp = await tournament.competitors.call(ath.person);
      assert.equal(id, comp.id);
    });

    it('A division may be added', async () => {
      let tx = await tournament.addSport('Freestyle wrestling', 'Safer than catch wrestling');
      let sportId = tx.logs[0].args[0]; // get the id from the event
      tx = await tournament.addDivision('125 lb', '', sportId, 125, 0);
      let divId = tx.logs[0].args[0];
      let div = await tournament.divisions.call(divId);
      assert.equal(divId, div.id);
      assert.equal('125 lb', div.name);
      assert.exists(div.weightClass);
      let wgt = await tournament.weights.call(div.weightClass);
      assert.equal(125, wgt.major);
      assert.equal(sportId, div.sport);
    });

    it('A competitor may be added and removed from a division', async () => {
      let tx = await tournament.addSport('Greco-Roman wrestling', 'No leg attacks!');
      let sportId = tx.logs[0].args[0]; // get the id from the event
      tx = await tournament.addDivision('145 lb', '', sportId, 145, 0);
      let divId = tx.logs[0].args[0];
      tx = await tournament.addAthlete('Samuel', 'Deadlift', 'Clemens', 145, 5, 5, 9);
      let athId = tx.logs[0].args[0];

      tx = await tournament.addCompetitor(divId, athId);
      assert.equal(divId, tx.logs[0].args[0]);
      assert.equal(athId, tx.logs[0].args[1]);

      assert(await tournament.hasCompetitor.call(divId, athId));

      tx = await tournament.removeCompetitor(divId, athId);
      assert.equal(divId, tx.logs[0].args[0]);
      assert.equal(athId, tx.logs[0].args[1]);

      assert(! (await tournament.hasCompetitor.call(divId, athId)));
    });

    it('A match may be added and removed from a division', async () => {
      let tx = await tournament.addSport('Brazilian JuJitsu', 'No gi');
      let sportId = tx.logs[0].args[0]; // get the id from the event
      tx = await tournament.addDivision('145 lb', '', sportId, 145, 0);
      let divId = tx.logs[0].args[0];
      tx = await tournament.addAthlete('Samuel', 'Deadlift', 'Clemens', 145, 5, 5, 9);
      let ath1Id = tx.logs[0].args[0];
      tx = await tournament.addAthlete('Fred', 'Muscles', 'Blarney', 145, 0, 5, 8);
      let ath2Id = tx.logs[0].args[0];

      tx = await tournament.addCompetitor(divId, ath1Id);
      assert.equal(divId, tx.logs[0].args[0]);
      assert.equal(ath1Id, tx.logs[0].args[1]);

      tx = await tournament.addCompetitor(divId, ath2Id);
      assert.equal(divId, tx.logs[0].args[0]);
      assert.equal(ath2Id, tx.logs[0].args[1]);

      assert(await tournament.hasCompetitor.call(divId, ath1Id));
      assert(await tournament.hasCompetitor.call(divId, ath2Id));

      const comps = [ ath1Id, ath2Id ];
      tx = await tournament.addMatch(divId, comps, "05:00", "This is a test match");
      let mtchId = tx.logs[0].args[0];
      assert(await tournament.hasMatch.call(mtchId, divId));

      let mtch = await tournament.matches.call(mtchId);
      assert.equal(divId, mtch.division);
      assert.equal("05:00", mtch.duration);

      let retComps = await tournament.getCompetitors.call(mtchId);
      assert.equal(2, retComps.length);

      tx = await tournament.removeMatch(mtchId, divId);
      assert.equal(mtchId, tx.logs[0].args[0]);

      let exists = await tournament.hasMatch.call(mtchId, divId);
      assert.equal(false, exists);
    });

    it('A penalty may be added to a match', async () => {
      let tx = await tournament.addSport('Boxing', 'American style boxing');
      let sportId = tx.logs[0].args[0]; // get the id from the event
      tx = await tournament.addDivision('Heavyweight', '', sportId, 201, 0);
      let divId = tx.logs[0].args[0];
      tx = await tournament.addAthlete('Mike', '', 'Tyson', 218, 0, 5, 11);
      let ath1Id = tx.logs[0].args[0];
      tx = await tournament.addAthlete('Muhammed', '', 'Ali', 212, 0, 6, 3);
      let ath2Id = tx.logs[0].args[0];

      tx = await tournament.addCompetitor(divId, ath1Id);
      assert.equal(divId, tx.logs[0].args[0]);
      assert.equal(ath1Id, tx.logs[0].args[1]);

      tx = await tournament.addCompetitor(divId, ath2Id);
      assert.equal(divId, tx.logs[0].args[0]);
      assert.equal(ath2Id, tx.logs[0].args[1]);

      const comps = [ ath1Id, ath2Id ];
      tx = await tournament.addMatch(divId, comps, "03:00", "This is a standard boxing round");
      let mtchId = tx.logs[0].args[0];
      assert(await tournament.hasMatch.call(mtchId, divId));

      tx = await tournament.addRule('No biting', 'The teeth shall not be used in professional boxing');
      let ruleId = tx.logs[0].args[0];

      tx = await tournament.addPenalty(mtchId, ruleId, 1, ath1Id);
      let penId = tx.logs[0].args[0]; 
      let pen = await tournament.penalties.call(penId);
      assert.equal(ath1Id, pen.offender);
      assert.equal(1, pen.cost);

      let penTest = await tournament.hasPenalty.call(mtchId, penId);
      assert(penTest);
    });

    it('A competitor may have a scored round', async() => {
      let tx = await tournament.addSport('Boxing', 'American style boxing');
      let sportId = tx.logs[0].args[0]; // get the id from the event
      tx = await tournament.addDivision('Heavyweight', '', sportId, 201, 0);
      let divId = tx.logs[0].args[0];
      tx = await tournament.addAthlete('Mike', '', 'Tyson', 218, 0, 5, 11);
      let ath1Id = tx.logs[0].args[0];
      tx = await tournament.addAthlete('Muhammed', '', 'Ali', 212, 0, 6, 3);
      let ath2Id = tx.logs[0].args[0];

      tx = await tournament.addCompetitor(divId, ath1Id);
      assert.equal(divId, tx.logs[0].args[0]);
      assert.equal(ath1Id, tx.logs[0].args[1]);

      tx = await tournament.addCompetitor(divId, ath2Id);
      assert.equal(divId, tx.logs[0].args[0]);
      assert.equal(ath2Id, tx.logs[0].args[1]);

      const comps = [ ath1Id, ath2Id ];
      tx = await tournament.addMatch(divId, comps, "03:00", "This is a standard boxing round");
      let mtchId = tx.logs[0].args[0];
      assert(await tournament.hasMatch.call(mtchId, divId));

      tx = await tournament.addScore(ath1Id, 10);
      assert.equal(ath1Id, tx.logs[0].args[1]);
      let ath1ScoreId = tx.logs[0].args[0];

      tx = await tournament.addScore(ath2Id, 9);
      assert.equal(ath2Id, tx.logs[0].args[1]);
      let ath2ScoreId = tx.logs[0].args[0];

      let ath1Score = await tournament.scores.call(ath1ScoreId);
      let ath2Score = await tournament.scores.call(ath2ScoreId);
      assert.equal(10, await ath1Score.value);
      assert.equal(9, await ath2Score.value);

      tx = await tournament.addRound(mtchId, [ath1ScoreId, ath2ScoreId]);
      let rndId = tx.logs[0].args[0];
      let rounds = await tournament.getRounds(mtchId);
      assert.equal(1, rounds.length);
      assert.equal(rndId, rounds[0]);
    });
});