const assert = require('assert');
const Nba = require('basketball-reference-js');
const { stub } = require('sinon');

const mocks = require('./mocks');
const jobs = require('../src/jobs');

describe.only('A job that collects data about the games', () => {
  const database = {
    collection: () => ({
      findOne: () => ({ lastDate: new Date(2018, 9, 16) }),
      update: () => ({})
    }),
  };
  let stubGetGames;
  let stubPlayByPlay;
  beforeEach(() => {
    stubGetGames = stub(Nba.games, 'get').callsFake(() => mocks.games);
    stubPlayByPlay = stub(Nba.games, 'playByPlay').callsFake(() => mocks.playByPlay);
  });
  afterEach(() => {
    stubGetGames.restore();
    stubPlayByPlay.restore();
  });
  it('should fetch the last processed date, add a day, and fetch the game', async () => {
    await jobs.collectGameData(database);
    assert.equal(stubGetGames.firstCall.args[0].toString(), 'Tue Oct 16 2018 00:00:00 GMT-0300 (GMT-03:00)');
  });
  it('should get the "play-by-play" of each game', async () => {
    await jobs.collectGameData(database);
    assert.equal(stubPlayByPlay.firstCall.args[0], '/boxscores/pbp/201810160BOS.html');
    assert.equal(stubPlayByPlay.secondCall.args[0], '/boxscores/pbp/201810160GSW.html');
  });
});
