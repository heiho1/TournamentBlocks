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
      let id = await tournament.addSport.call('Shuai Jiao', 'Chinese Wrestling');
      console.log('Sport id:' + id);
      assert.exists(id);
      let sport = await tournament.sports.call(id);
      assert.exists(sport);
      assert.equal('Shuai Jiao', sport.name);
    });

    it('A rule may be added', async function() {
      let id = await tournament.addRule.call('Overall Cleanliness', 'Free of odor with no open wounds or infections.');
      console.log('Rule id:' + id);
      assert.exists(id);
      let rule = await tournament.rules.call(id);
      assert.exists(rule);
      assert.equal('Overall Cleanliness', rule.name);
    });
  
    it('An athlete may be added as a competitor', () => {
      let id;
      let t;
      let ath;
      let comp;
      return Tournament.deployed().then(instance => {
        t = instance;
        console.log('Athlete contract:' + instance.address);
        return instance.addAthlete.call('Folly', 'Aux', 'Deux', 130, 5, 5, 8);
      }).then(identity => {
        assert.exists(identity);
        console.log('Athlete id:' + identity);
        id = identity;
        return t.athletes.call(identity);
      }).then(athlete => {
        assert.exists(athlete);
        assert.equal(id, athlete.person);
        ath = athlete;
        console.log(athlete);
        return t.competitors.call(ath.person);
      }).then(competitor => {
        assert.exists(competitor);
        assert.equal(id, competitor.id);
        comp = competitor;
        console.log(competitor);
        return competitor;
      }).then(competitor => {
        console.log(id);
        console.log(ath);
        console.log(comp);
      });
    });

    // it('An athlete may be added as a competitor', function() {
    //   let id; 
    //   let t;
    //   Tournament.deployed().then(instance => {
    //     console.log('Got an instance: ' + instance);
    //     t = instance;
    //     console.log('starting addAthlete ' + id);
    //     return t.addAthlete.call('Folly', 'Aux', 'Deux', 130, 5, 5, 8);
    //   }).then(identity => {
    //     assert.exists(identity);
    //     console.log(identity); 
    //     id = identity;
    //     console.log('addAthlete done ' + id);
    //     return id;
    //   });
    //   // let athlete;
    //   // tournament.athletes.call(id).then(athlete => {
    //   //   assert.exists(athlete);
    //   //   assert.equal(id, athlete.id);
    //   // });
    //   // let competitor = await tournament.competitors.call(id);
    //   // console.dir(competitor);
    //   // assert.exists(competitor);
    //   // assert.equal(id, competitor.id);
    // });
});