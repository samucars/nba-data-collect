const Nba = require('basketball-reference-js');

module.exports = async (database) => {
  try {
    const { lastDate } = await database.collection('jobs').findOne({});

    const games = await Nba.games.get(lastDate);
    const requests = games.map(item => Nba.games.playByPlay(item.statistics.playByPlay));
    const playByPlays = await Promise.all(requests);

    await database.collection('jobs').update({}, {}, { upsert: true });
  } catch (error) {
    console.log(`[JOB] collectGameDate error - ${error.message}`);
  }
};
