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
 * @event {cron} * * * * *
 *
 * @params event
 * @params context
 */
module.exports.handler = async () => {
  try {
    const connection = await connect();
    const { lastDate } = await lastDateTheJobWasRun(connection);
    const games = await Nba.games.get(lastDate);

    const playByPlays = await Promise.all(
      games.map(item => Nba.games.playByPlay(item.statistics.playByPlay))
    );

    // save statistics with playByPlay and game date
    await Promise.all(
      playByPlays.map(game => savePlayByPlay(connection, game, nextDate(lastDate)))
    );

    await saveLastDateTheJobWasRun(connection, lastDate);

    return { statusCode: 200 };
  } catch (error) {
    console.log(`[collectGameDate] error - ${error.message}`);
    return error;
  }
};
