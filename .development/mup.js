module.exports = {
  servers: {
    one: {
      host: '82.223.83.151',
      username: 'root',
      // pem: '/Users/sroettering/.ssh/id_rsa', // dont user ~ in paths, otherwise mup fails silently!
      password: 'Hw1p4U2jKd',
      // or leave blank for authenticate from ssh-agent
    }
  },

  meteor: {
    name: 'RoastMe',
    path: '../',
    servers: {
      one: {}
    },
    buildOptions: {
      debug: true,
      serverOnly: true,
    },
    env: {
      ROOT_URL: 'http://roastme.iq-dev.com',
      // MONGO_URL: 'mongodb://localhost/meteor'
    },

    dockerImage: 'abernix/meteord:base',
    deployCheckWaitTime: 60,
  },

  mongo: {
    oplog: true,
    port: 27017,
    servers: {
      one: {},
    },
  },
};
