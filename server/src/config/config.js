/* */
module.exports = {
  env: {

  },
  appname: process.env.OPENSHIFT_APP_NAME || 'Reminders',
  port: process.env.OPENSHIFT_NODEJS_PORT || 8081,
  serverIp: process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0',
  apiDomain: process.env.OPENSHIFT_DOMAIN || 'http://localhost',
  db: {
    database: process.env.OPENSHIFT_MONGODB_DB_URL || 'mongodb://localhost:27017/DisneyReminder'
  },
  authentication: {
    jwtSecret: process.env.OPENSHIFT_JWT_SECRET || 'secret',
    tmpUser: process.env.tmpUserName || 'jonathan',
    tmpPsswrd: process.env.tmpPasswrd || 'password'
  }
}
