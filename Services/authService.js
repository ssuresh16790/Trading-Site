const authController = require("../Controllers/authController");
const db = require("../config/database");
const _ = require("lodash");
const Joi = require("joi");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const env = require('dotenv').config();
const otpGenerator = require('otp-generator');

//addAdmin
module.exports.addAdmin = async(props) => {
  try {
    
const { firstName, lastName, userName, email, mobileNumber, password } = props

    const hashPassword = bcrypt.hashSync(password, 10);
  
    const response = await db("admin").insert({firstName, lastName, userName, email, mobileNumber, password:hashPassword });
    console.log(response);
    return !_.isEmpty(response) ? response : null;

  } catch (error) {
    console.log(error);
  }
};


//adminLogin
module.exports.adminLogin = async (props) => {
    try {
      const { email, password } = props;
  
      const response = await db("user")
        .select("email", "password")
        .where("email", "=", email, "password", "=", password).first();
  
        const originalPassword = response.password
  
        const hashPassword = await bcrypt.compareSync(password, originalPassword);
  
      return !_.isEmpty(response) ? response : null;
  
    } catch (error) {
  
      console.log(error);
    }
  };


//addUser
module.exports.addUser = async(props) => {
  try {

const { firstName, lastName, userName, email, mobileNumber, password, type, address } = props


    const hashPassword = bcrypt.hashSync(password, 10);


    const response = await db("user").insert({firstName, lastName, userName, email, mobileNumber, password:hashPassword, type, address});
    console.log(response);
    return !_.isEmpty(response) ? response : null;

  } catch (error) {
    console.log(error);
  }
};


//userLogin
module.exports.userLogin = async(props) => {
    try {
      const { email, password } = props;
     
      const otp = otpGenerator.generate(6, { upperCase: false, specialChars: false, alphabets: false })

      console.log(otp);

      
      // const response = await db('user').select('email','password', 'type').where('email', email).where({password}).where({type})
      const response = await db('user').select('email', 'password').where('email' , '=', email);
                 console.log(response);       
      if(!_.isEmpty(response)){
        const storedPasswordHash = _.get(response, "[0].password", "");

        const hashpassword =  await bcrypt.compare(password, storedPasswordHash);
        
        if(hashpassword){
          const accessToken =  jwt.sign({email : email}, process.env.ACCESS_TOKEN, {expiresIn : '10m'});

          const refreshToken =  jwt.sign({email : email}, process.env.ACCESS_TOKEN, {expiresIn : '1d'});
          response.accessToken = accessToken;
          response.refreshToken = refreshToken;
          return !_.isEmpty(response) ? response : null;
        }
     
      }

        
  
    } catch (error) {
      console.log(error);
    }
  };


  module.exports.checkUser = async (email) => {
    try {
        const response = await db('user').select('email').where('email', '=', email).first();
        if(!_.isNull(response)) {
            return null;
        } else {
            return true;
        }
        
    } catch (error) {
        console.log(error);
    }
}

