const { title } = require("node:process");

let infoCourses = {
  'programing': [
    {
      id: 1,
      title: 'learn basic python',
      language: 'python basic',
      views: 1000,
      level: 'begin'
    },
    {
      id: 2,
      title: 'learn intermediate python',
      language: 'python intermediate',
      views: 5000,
      level: 'intermediate'
    },
    {
      id: 3,
      title: 'learn advance javascript',
      language: 'javascript advance',
      views: 1000,
      level: 'advance'
    }
  ],
  'mathematics': [
    {
      id: 1,
      title: 'learn calculus',
      topics: 'calculus',
      views: 67000,
      level: 'begin'
    },
    {
      id: 2,
      title: 'learn algebra',
      topics: 'algebra',
      views: 67000,
      level: 'intermediate'
    },
    {
      id: 1,
      title: 'learn probability',
      topics: 'probability',
      views: 67000,
      level: 'advance'
    }
  ]
}

module.exports.infoCourses = infoCourses;
