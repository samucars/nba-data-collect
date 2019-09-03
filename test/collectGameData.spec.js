const assert = require('assert');
const Nba = require('basketball-reference-js');
const mongo = require('mongodb').MongoClient;
const { stub } = require('sinon');

const mocks = require('./mocks');
const jobs = require('../jobs');

describe('A job that collects data about the games', () => {
  const stubFindOne = stub().callsFake(() => ({ lastDate: new Date(2018, 9, 16) }));
  const stubFindOneAndUpdate = stub();
  const stubInsertOne = stub();

  let stubConnect;
  let stubDb;
  let stubGetGames;
  let stubPlayByPlay;
  beforeEach(() => {
    stubDb = stub().callsFake(() => ({
      collection: stub().callsFake(() => ({
        findOne: stubFindOne,
        findOneAndUpdate: stubFindOneAndUpdate,
        insertOne: stubInsertOne,
      }))
    }));

    stubConnect = stub(mongo, 'connect').callsFake(() => ({ db: stubDb }));
    stubGetGames = stub(Nba.games, 'get').callsFake(() => mocks.games);
    stubPlayByPlay = stub(Nba.games, 'playByPlay').callsFake(() => mocks.playByPlay);
  });
  afterEach(() => {
    stubConnect.restore();
    stubGetGames.restore();
    stubPlayByPlay.restore();
  });
  it('shoul connect database and fetch the last processed date', async () => {
    await jobs.collectGameData.handler();

    assert.equal(stubConnect.firstCall.args[0].constructor.name, 'String');
    assert.equal(stubConnect.firstCall.args[1].useNewUrlParser, true);
    assert.equal(stubConnect.firstCall.args[1].poolSize, 1);

    assert.equal(stubDb.firstCall.args[0], 'nba-stats');
  });
  it('should fetch the game', async () => {
    stubGetGames.callsFake(() => []);
    stubPlayByPlay.callsFake(() => []);

    await jobs.collectGameData.handler();

    assert.equal(stubGetGames.firstCall.args[0].toString(), 'Mon Oct 15 2018 00:00:00 GMT-0300 (GMT-03:00)');
  });
  it('should get the "play-by-play" of each game', async () => {
    await jobs.collectGameData.handler();
    assert.equal(stubPlayByPlay.firstCall.args[0], '/boxscores/pbp/201810160BOS.html');
    assert.equal(stubPlayByPlay.secondCall.args[0], '/boxscores/pbp/201810160GSW.html');
  });
  it('should save "play-by-play" stats', async () => {
    await jobs.collectGameData.handler();

    const args = stubInsertOne.firstCall.args[0];
    assert.equal(args.game.date.toString(), 'Mon Oct 15 2018 00:00:00 GMT-0300 (GMT-03:00)');
    assert.equal(args.game.link, 'tchanana');
    assert.equal(args.stats.constructor.name, 'Array');
    assert.equal(args.createdAt.constructor.name, 'Date');
  });
  it('should save last the job was run', async () => {
    await jobs.collectGameData.handler();

    assert.equal(Object.keys(stubFindOneAndUpdate.firstCall.args[0]).length, 0);
    assert.equal(stubFindOneAndUpdate.firstCall.args[1].$set.lastDate.toString(), 'Mon Oct 15 2018 00:00:00 GMT-0300 (GMT-03:00)');
  });
  it('should return exception', async () => {
    stubFindOneAndUpdate.throws('error');
    try {
      await jobs.collectGameData.handler();
    } catch (error) {
      assert.equal(error, 'error');
    }
  });
});
