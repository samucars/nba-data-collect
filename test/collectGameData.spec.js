const assert = require('assert');
const Nba = require('basketball-reference-js');
const mongo = require('mongodb').MongoClient;
const { stub } = require('sinon');

const mocks = require('./mocks');
const jobs = require('../jobs');
// const {} = require('../jobs/database');

describe('A job that collects data about the games', () => {
  // const database = {
  //   collection: () => ({
  //     findOne: () => ({ lastDate: new Date(2018, 9, 16) }),
  //     update: () => ({})
  //   }),
  // }; 2018-10-16T03:00:00.000Z
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
  it('shoul connect database', async () => {
    await jobs.collectGameData.handler();

    assert.equal(stubConnect.firstCall.args[0].constructor.name, 'String');
    assert.equal(stubConnect.firstCall.args[1].useNewUrlParser, true);
    assert.equal(stubConnect.firstCall.args[1].poolSize, 1);

    assert.equal(stubDb.firstCall.args[0], 'nba-stats');
  });
  it('should fetch the last processed date, add a day, and fetch the game', async () => {
    await jobs.collectGameData.handler();
    assert.equal(stubGetGames.firstCall.args[0].toString(), 'Tue Oct 16 2018 00:00:00 GMT-0300 (GMT-03:00)');
  });
  // it.skip('should get the "play-by-play" of each game', async () => {
  //   await jobs.collectGameData();
  //   assert.equal(stubPlayByPlay.firstCall.args[0], '/boxscores/pbp/201810160BOS.html');
  //   assert.equal(stubPlayByPlay.secondCall.args[0], '/boxscores/pbp/201810160GSW.html');
  // });
});
