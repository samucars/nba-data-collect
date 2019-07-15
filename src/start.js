const mongo = require('mongodb').MongoClient;

const jobs = require('./jobs');

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
  } catch (error) {
    console.log(`fatal error - ${error.message}`);
  }
}

module.exports = start;
