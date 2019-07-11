const Nba = require('basketball-reference-js');

module.exports = async (database) => {
  try {
    await Nba.games.get(new Date(2019, 1, 13));
    await database.collection('jobs').findOne({});
  } catch (error) {
    console.log(`[JOB] collectGameDate error - ${error.message}`);
  }
};
