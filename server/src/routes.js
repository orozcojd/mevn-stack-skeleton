const UserController = require('./controllers/UserController')
const AuthenticationController = require('./controllers/AuthenticationController')
const AuthenticationControllerPolicy = require('./policies/AuthenticationControllerPolicy')

module.exports = (app) => {
  app.post('/login',
    AuthenticationController.login)
  app.get('/users',
    UserController.getUsers)
  app.post('/users',
    AuthenticationControllerPolicy.register,
    UserController.create)
  app.delete('/users/:userId',
    UserController.delete)
}
