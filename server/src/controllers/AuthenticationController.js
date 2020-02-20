// const { User } = require('../models')
const passport = require('passport')
const randomToken = require('rand-token')

const refreshTokens = []

module.exports = {

  /**
 * POST REQUEST
 * Validates user by comparing hash of user plaintext pw
 * to hash stored in db returning token and user details if
 * valid
 * @param {Object} req
 * @param {Object} res
 */
  login (req, res) {
    if (!req.body.email.trim() || !req.body.password.trim()) {
      return res.status(403).send({
        error: 'Please enter valid credentials'
      })
    }
    passport.authenticate('local', async (err, user, info) => {
      if (err) {
        return res.status(404).send({
          error: 'Something went wrong trying to log you in.'
        })
      }
      if (user) {
        const token = user.generateToken()
        const refreshToken = randomToken.uid(256)
        refreshTokens[refreshToken] = user.email
        const { _id, email } = user
        res.status(200).send({
          token,
          refreshToken,
          user: { _id, email }
        })
      } else {
        res.status(401).send(info)
      }
    })(req, res)
  },

  //   /**
  //  * POST REQUEST
  //  * Extracts email and refresh token from body and if valid: responds with new token
  //  * otherwise send 401
  //  * @param {Object} req
  //  * @param {Object} res
  //  */
  //   async refreshToken (req, res) {
  //   // if (!req.is('json')) {
  //   // 	return res.sendStatus(415); // -> Unsupported media type if request doesn't have JSON body
  //   // }
  //     const email = req.body.email
  //     const refreshToken = req.body.refreshToken
  //     try {
  //       if ((refreshToken in refreshTokens) && refreshTokens[refreshToken] === email) {
  //         await User.findOne({ email: email }, (err, user) => {
  //           if (!user) {
  //             res.status(401).send({ error: 'User not found.' })
  //           } else {
  //             const token = user.generateToken()
  //             res.status(200).send({ token: token })
  //           }
  //         })
  //       } else {
  //         res.status(401).send({ error: 'Unauthorized! Please log in and try again.' })
  //       }
  //     } catch (err) {
  //       res.status(401).send({
  //         error: 'Unexpected Error occurred!'
  //       })
  //     }
  //   },

  /** POST REQUEST
 * Extracts refreshtoken from req and if found, deletes refreshtoken from global array
 * @param {Object} req
 * @param {Object} res
 */
  rejectToken (req, res) {
    const refreshToken = req.body.refreshToken
    if (refreshToken in refreshTokens) {
      delete refreshTokens[refreshToken]
    }
    res.sendStatus(204)
  }
}
