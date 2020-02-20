const Joi = require('joi')

module.exports = {
  register (req, res, next) {
    const schema = {
      email: Joi.string().email(),
      password: Joi.string().regex(
        new RegExp('^[a-zA-Z0-9!@#$%^&*()]{8,40}$')
      )
    }
    const { error, value } = Joi.validate(req.body, schema)
    console.log(value)
    if (error) {
      let err = ''
      switch (error.details[0].context.key) {
        case 'email':
          err = 'You must send a valid email address.'
          res.status(400).send({
            error: err
          })
          break
        case 'password':
          err = 'Password failed to match the following rules: It \
must be between 8-40 characters on length. 2. Only special \
characters [!@#$%^&*()] are allowed. Must consist of only lower case, upper case, or numeric characters.'
          res.status(400).send({
            error: err
          })
          break
        default:
          err = 'Invalid registration information.'
          res.status(400).send({
            error: err
          })
      }
    } else {
      next()
    }
  }
}
