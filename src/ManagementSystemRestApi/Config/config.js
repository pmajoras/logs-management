"use strict";

var config = {};

if (process.env.PGPENV == 'PROD') {
  config = {
    secret: "testSecret",
    web: {
      port: process.env.PGPPORT || 8085
    },
    logs: {

    },
    db: {
      connectionString: process.env.PGPDB || 'mongodb://localhost/ManagementSystem'
    }
  };
}
else {
  config = {
    secret: "testSecret",
    web: {
      port: process.env.PGPPORT || 8085
    },
    logs: {

    },
    db: {
      connectionString: process.env.PGPDB || 'mongodb://localhost/ManagementSystem'
    }
  };
}

module.exports = config;