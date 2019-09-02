const mongo = require('mongodb').MongoClient;

const connect = async () => {
  const client = await mongo.connect(process.env.DB_HOST, { useNewUrlParser: true, poolSize: 1 });
  return client.db('nba-stats');
};

const close = connection => connection.close();

const lastDateTheJobWasRun = connection => connection
  .collection('jobs')
  .findOne({});

const saveLastDateTheJobWasRun = (connection, date) => connection
  .collection('jobs')
  .findOneAndUpdate({}, {
    $set: {
      lastDate: date
    }
  });

const savePlayByPlay = (connection, game, gameDate) => connection
  .collection('playByPlays')
  .insertOne({
    game: {
      date: gameDate,
      link: game.link
    },
    stats: game.quarters,
    createdAt: new Date()
  });

module.exports = {
  close,
  connect,

  lastDateTheJobWasRun,
  saveLastDateTheJobWasRun,
  savePlayByPlay
};
