const Tournament = artifacts.require('Tournament');

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

    it('A competitor may be added and removed from a division', async() => {
      let tx = await tournament.addSport('Greco-Roman wrestling', 'No leg attacks!');
      let sportId = tx.logs[0].args[0]; // get the id from the event
      tx = await tournament.addDivision('145 lb', '', sportId, 145, 0);
      let divId = tx.logs[0].args[0];
      tx = await tournament.addAthlete('Samuel', 'Deadlift', 'Clemenr', 145, 5, 5, 9);
      let athId = tx.logs[0].args[0];
      
      tx = await tournament.addCompetitorToDivision(divId, athId);
      assert.equal(divId, tx.logs[0].args[0]);
      assert.equal(athId, tx.logs[0].args[1]);

      assert(await tournament.hasCompetitor.call(divId, athId));

      tx = await tournament.removeCompetitorFromDivision(divId, athId);
      assert.equal(divId, tx.logs[0].args[0]);
      assert.equal(athId, tx.logs[0].args[1]);

      assert(! (await tournament.hasCompetitor.call(divId, athId)));
    });
});