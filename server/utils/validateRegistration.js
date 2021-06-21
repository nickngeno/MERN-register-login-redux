const Joi =  require("joi")

const registerValidation = (data) =>{
  const userValidateSchema = Joi.object({
    firstName : Joi.string().min(3).max(20).required(),
    lastName : Joi.string().min(3).max(20).required(),
    email:Joi.string().required().email().max(255),
    password: Joi.string().min(6).max(255),
    isDeleted: Joi.boolean()
  })

  return userValidateSchema.validate(data)
}
const loginValidation = (data) => {
  const userValidateSchema = Joi.object({
    email:Joi.string().required().email().max(255),
    password: Joi.string().min(6).max(255),
  })

  return userValidateSchema.validate(data)

}


module.exports.registerValidation = registerValidation
module.exports.loginValidation = loginValidation