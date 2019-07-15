const assert = require('assert');
const mongo = require('mongodb').MongoClient;
const { stub } = require('sinon');

const jobs = require('../src/jobs');
const start = require('../src/start');

describe('A function that initializes jobs', () => {
  const stubClientDb = { db: stub(), close: stub() };
  let stubMongo;
  let stubCollectGameData;
  beforeEach(() => {
    stubMongo = stub(mongo, 'connect').callsFake(() => Promise.resolve(stubClientDb));
    stubCollectGameData = stub(jobs, 'collectGameData').callsFake(() => Promise.resolve());
  });
  afterEach(() => {
    stubMongo.restore();
    stubCollectGameData.restore();
  });
  it('should connect with mongodb', async () => {
    await start();
    assert.equal(stubMongo.firstCall.args[0].constructor.name, 'String');
    assert.equal(stubMongo.firstCall.args[1].useNewUrlParser, true);
    assert.equal(stubMongo.firstCall.args[1].poolSize, 1);
    assert.equal(stubClientDb.db.firstCall.args[0], 'nba-stats');
  });
  it('should call the job to collect game data', async () => {
    stubClientDb.db = () => ({ db: true });
    await start();
    assert.equal(stubCollectGameData.firstCall.args[0].db, true);
  });
  it('should close the connection with mongodb', async () => {
    await start();
    assert.equal(stubClientDb.close.called, true);
  });
});
