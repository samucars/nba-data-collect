const jobs = require('./jobs');

async function start() {
  await jobs.collectGameData.handler();

  process.exit(1);
}

start();
