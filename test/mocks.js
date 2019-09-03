const games = [
  {
    game: 'Philadelphia vs Boston',
    score: [87, 105],
    statistics: {
      boxScores: '/boxscores/201810160BOS.html',
      playByPlay: '/boxscores/pbp/201810160BOS.html',
      shotChart: '/boxscores/shot-chart/201810160BOS.html'
    }
  },
  {
    game: 'Oklahoma City vs Golden State',
    score: [100, 108],
    statistics: {
      boxScores: '/boxscores/201810160GSW.html',
      playByPlay: '/boxscores/pbp/201810160GSW.html',
      shotChart: '/boxscores/shot-chart/201810160GSW.html'
    }
  }
];

const playByPlay = {
  link: 'tchanana',
  quarters: [
    {
      quarter: 1,
      plays: [
        {
          time: '11:40.0',
          team: 'Philadelphia',
          play: 'R. Covington misses 3-pt jump shot from 27 ft',
          scoring: 0
        },
        {
          time: '11:40.0',
          team: 'Boston',
          play: 'Defensive rebound by Team',
          scoring: 0
        }
      ]
    },
    {
      quarter: 2,
      plays: [
        {
          time: '11:50.0',
          team: 'Boston',
          play: 'G. Hayward makes 2-pt jump shot from 13 ft',
          scoring: 2
        },
        {
          time: '11:26.0',
          team: 'Philadelphia',
          play: 'Turnover by J. Embiid (bad pass; steal by G. Hayward)',
          scoring: 0
        }
      ]
    },
    {
      quarter: 3,
      plays: [
        {
          time: '11:34.0',
          team: 'Boston',
          play: 'A. Baynes makes 2-pt dunk from 2 ft (assist by A. Horford)',
          scoring: 2
        },
        {
          time: '11:16.0',
          team: 'Philadelphia',
          play: 'B. Simmons makes 2-pt hook shot from 4 ft',
          scoring: 2
        }
      ]
    },
    {
      quarter: 4,
      plays: [
        {
          time: '11:40.0',
          team: 'Philadelphia',
          play: 'Shooting foul by A. Baynes (drawn by J. Embiid)',
          scoring: 0
        },
        {
          time: '11:40.0',
          team: 'Philadelphia',
          play: 'J. Embiid misses free throw 1 of 2',
          scoring: 0
        }
      ]
    }
  ],
};

module.exports = {
  games,
  playByPlay
};
