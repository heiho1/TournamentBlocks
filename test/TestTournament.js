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
        // let tournament;
        // return Tournament.deployed().then(function(instance) {
        //     tournament = instance;
        // }).then(async function() {
            let owner = await tournament.owner.call();
            let admin = await tournament.admin.call();
            assert.exists(owner);
            assert.exists(admin);
            assert.equal(owner, accounts[0]);
        // });
    });
    it('An identifier can be generated', async function() {
        let id = await tournament.newId.call();
        console.log(id);
        assert.exists(id);
    });

});