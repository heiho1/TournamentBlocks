const Tournament = artifacts.require('Tournament');

contract('TournamentTests', function(accounts) {
    const TOURNAMENT_NAME = 'Shuai Jiao Tournament';
    let tournament;

    it('Tournament can be deployed and given a title', function() {
      console.log(accounts);

      return Tournament.deployed().then(function(instance) {
        tournament = instance;
        tournament.setTitle(TOURNAMENT_NAME);
      }).then(async function() {
        let title = await tournament.title.call();
        assert.equal(title, TOURNAMENT_NAME);
      });
    });

    it('Tournament has an owner and an admin', async function() {
      let owner = await tournament.owner.call();
      let admin = await tournament.admin.call();
      assert.exists(owner);
      assert.exists(admin);
      assert.equal(owner, accounts[0]);
    });

    it('An identifier can be generated', async function() {
      let id = await tournament.newId.call();
      // console.log(id);
      assert.exists(id);
    });

    it('A sport may be added', async function() {
      let id = await tournament.addSport.call('Shuai Jiao', 'Chinese Wrestling');
      assert.exists(id);
      let sport = await tournament.sports.call(id);
      assert.exists(sport);
    });

    it('A rule may be added', async function() {
      let id = await tournament.newRule.call('Overall Cleanliness', 'Free of odor with no open wounds or infections.');
      assert.exists(id);
      let rule = await tournament.rules.call(id);
      assert.exists(rule);
    });
});