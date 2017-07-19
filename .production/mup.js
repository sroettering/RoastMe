module.exports = {
  servers: {
    one: {
      host: '82.223.39.174',
      username: 'root',
      // pem: '/Users/sroettering/.ssh/id_rsa', // dont user ~ in paths, otherwise mup fails silently!
      password: 'Bt99KPH13r',
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
      debug: false,
      serverOnly: true,
    },
    env: {
      ROOT_URL: 'https://itsroast.me',
      // MONGO_URL: 'mongodb://localhost/meteor'
    },
    ssl: {
      crt: './itsroast.me_ssl.pem', // this is a bundle of certificates
      key: './www.itsroast.me_private_key.key', // this is the private key of the certificate
      port: 443 // 443 is the default value and it's the standard HTTPS port
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
