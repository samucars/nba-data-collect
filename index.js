const mongo = require('mongodb').MongoClient;

const jobs = require('./jobs');

process.env.DB_HOST = 'mongodb://josnel:neca2546@ds349587.mlab.com:49587/nba-stats';

/**
 * The heroku scheduler will initialize the process every 10 minutes
 *
 * The 10 minute interval is intended to avoid possible rate limiting or firewall errors
 *
 * Other jobs must be initialized at this time
 */
async function start() {
  try {
    const client = await mongo.connect(process.env.DB_HOST, { useNewUrlParser: true, poolSize: 1 });
    const database = client.db('nba-stats');
    await jobs.collectGameData(database);

    client.close();
    process.exit(0);
  } catch (error) {
    console.log(`fatal error - ${error.message}`);
  }
}

start();
