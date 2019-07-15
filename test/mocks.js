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

const playByPlay = [
  [
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
  [
    {
      quarter: 1,
      plays: [
        {
          time: '11:48.0',
          team: 'Golden State',
          play: 'Turnover by K. Thompson (bad pass; steal by S. Adams)',
          scoring: 0
        },
        {
          time: '11:43.0',
          team: 'Oklahoma City',
          play: 'Turnover by P. George (bad pass)',
          scoring: 0
        }
      ]
    },
    {
      quarter: 2,
      plays: [
        {
          time: '11:40.0',
          team: 'Oklahoma City',
          play: 'Shooting foul by Q. Cook (drawn by R. Felton)',
          scoring: 0
        },
        {
          time: '11:40.0',
          team: 'Oklahoma City',
          play: 'R. Felton makes free throw 1 of 3',
          scoring: 1
        }
      ]
    },
    {
      quarter: 3,
      plays: [
        {
          time: '11:50.0',
          team: 'Oklahoma City',
          play: 'P. George makes 2-pt jump shot from 4 ft',
          scoring: 2
        },
        {
          time: '11:27.0',
          team: 'Oklahoma City',
          play: 'Violation by Team (kicked ball)',
          scoring: 0
        }
      ]
    },
    {
      quarter: 4,
      plays: [
        {
          time: '11:45.0',
          team: 'Golden State',
          play: 'Offensive foul by J. Jerebko (drawn by H. Diallo)',
          scoring: 0
        },
        {
          time: '11:45.0',
          team: 'Golden State',
          play: 'Turnover by J. Jerebko (offensive foul)',
          scoring: 0
        }
      ]
    }
  ]
];

module.exports = {
  games,
  playByPlay
};
