const { User } = require('../models')

module.exports = {
  /**
 * GET REQUEST
 * Returns all users found in the database
 * @param {Object} req
 * @param {Object} res
 */
  async getUsers (req, res) {
    try {
      const users = await User.find()
      res.send(users)
    } catch (err) {
      res.status(400).send({
        error: 'Unexpected error has occurred'
      })
    }
  },
  /**
* POST REQUEST
* Adds a new user to db if req contains id of super user
* and unique fields are unique -- otherwise responds with 400 error
* @param {Object} req
* @param {Object} res
*/
  async create (req, res) {
    try {
      const { email, password } = req.body
      const user = new User()
      await user.createUser({ email })
      await user.hashPassword(password)
      user.save(async (err, saved) => {
        if (err) {
          res.status(400).send({
            error: 'Email already in use.'
          })
        } else {
          res.status(200).send({
            message: `User ${user.email} was created`
          })
        }
      })
    } catch (err) {
      res.status(400).send({
        error: err
      })
    }
  },
  /**
   * Deletes user by userId and returns delete count
   * @param {Object} req
   * @param {Object} res
   */
  async delete (req, res) {
    try {
      const deleteCount = await User.deleteOne({
        _id: req.params.userId
      })
      res.send({
        deleteCount: deleteCount,
        id: req.params.userId
      })
    } catch (err) {
      res.status(400).send({
        error: err

      })
    }
  }
}
