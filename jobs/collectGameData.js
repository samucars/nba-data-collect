const Nba = require('basketball-reference-js');

const {
  connect,
  lastDateTheJobWasRun,
  saveLastDateTheJobWasRun,
  savePlayByPlay,
} = require('./database');

const nextDate = date => new Date(date.setDate(date.getDate() - 1));

/**
 * @description This function fetches play-by-play statistics for each game.
 *
 * @event {cron} 0/15 * * * *
 *
 * @params event
 * @params context
 */
// eslint-disable-next-line
module.exports.handler = async (event, context) => {
  try {
    const connection = await connect();
    const { lastDate } = await lastDateTheJobWasRun(connection);

    console.log(`job starter with date ${lastDate}`);

    const games = await Nba.games.get(lastDate);
    const playByPlays = await Promise.all(
      games.map(item => Nba.games.playByPlay(item.statistics.playByPlay))
    );

    // save statistics with playByPlay and game date
    await Promise.all(
      playByPlays.map(game => savePlayByPlay(connection, game, lastDate))
    );

    await saveLastDateTheJobWasRun(connection, nextDate(lastDate));

    return { statusCode: 200 };
  } catch (error) {
    console.log(`error - ${error.message}`);
    return error;
  }
};
