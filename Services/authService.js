const authController = require("../Controllers/authController");
const db = require("../config/database");
const _ = require("lodash");
const Joi = require("joi");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const env = require("dotenv").config();
const otpGenerator = require("otp-generator");
const moment = require("moment");

//addAdmin
module.exports.addAdmin = async (props) => {
  try {
    console.log(props);
    const { firstName, lastName, email, mobileNumber, password } =
      props;

    const hashPassword = bcrypt.hashSync(password, 10);

    const response = await db("admin").insert({
      firstName,
      lastName,
      email,
      mobileNumber,
      password: hashPassword,
    });
    console.log(response);
    return !_.isEmpty(response) ? response : null;
  } catch (error) {
    console.log(error);
  }
};

//adminLoginOTP
module.exports.adminLogin = async (props) => {
  try {
    const { email, password } = props;

    const response = await db("user")
      .select("email", "password")
      .where("email", "=", email, "password", "=", password)
      .first();

    const originalPassword = response.password;

    const hashPassword = await bcrypt.compareSync(password, originalPassword);

    return !_.isEmpty(response) ? response : null;
  } catch (error) {
    console.log(error);
  }
};

//addUser
module.exports.addUser = async (props) => {
  try {
    const {
      firstName,
      lastName,
      userName,
      email,
      mobileNumber,
      password,
      type,
      address,
    } = props;

    const hashPassword = bcrypt.hashSync(password, 10);

    const response = await db("user").insert({
      firstName,
      lastName,
      userName,
      email,
      mobileNumber,
      password: hashPassword,
      type,
      address,
    });
    console.log(response);
    return !_.isEmpty(response) ? response : null;
  } catch (error) {
    console.log(error);
  }
};

//userLogin
module.exports.userLogin = async (props) => {
  try {
    const { email, password } = props;

    // const response = await db('user').select('email','password', 'type').where('email', email).where({password}).where({type})
    const response = await db("user")
      .select("email", "password")
      .where("email", "=", email);
    console.log(response);
    if (!_.isEmpty(response)) {
      const storedPasswordHash = _.get(response, "[0].password", "");

      const hashpassword = await bcrypt.compare(password, storedPasswordHash);

      if (hashpassword) {
        const accessToken = jwt.sign(
          { email: email },
          process.env.ACCESS_TOKEN,
          { expiresIn: "10m" }
        );

        const refreshToken = jwt.sign(
          { email: email },
          process.env.ACCESS_TOKEN,
          { expiresIn: "1d" }
        );
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
    const response = await db("user")
      .select("email")
      .where("email", "=", email);
    console.log(response);
    if (!_.isEmpty(response)) {
      return null;
    } else {
      return true;
    }
  } catch (error) {
    console.log(error);
  }
};

//userOTPSending
module.exports.updateOtpForUser = async (email, otp) => {
  try {
    console.log(otp);
    const response = await db("user")
      .update({ otp: otp })
      .where("email", email);
    console.log('res',response);
    return !_.isEmpty(response) ? response : null;
  } catch (error) {
    console.log(error);
  }
};

module.exports.userLoginOtpVerification = async (props) => {
  try {
    const { email, otp } = props;
    const response = await db("user")
      .select("email", "otp")
      .where("otp", otp)
      .where("email", email);
    console.log(response);
    return !_.isEmpty(response) ? response : null;
  } catch (error) {
    console.log(error);
  }
};

module.exports.adminLogin = async (props) => {
  try {
    const { email, password } = props;

    // const response = await db('user').select('email','password', 'type').where('email', email).where({password}).where({type})
    const response = await db("admin")
      .select("email", "password")
      .where("email", "=", email);
    console.log(response);
    if (!_.isEmpty(response)) {
      const storedPasswordHash = _.get(response, "[0].password", "");

      const hashpassword = await bcrypt.compare(password, storedPasswordHash);

      if (hashpassword) {
        return !_.isEmpty(response) ? response : null;
      }
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports.updateOtpForAdmin = async (email, otp) => {
  try {
    console.log(email, otp);
    const response = await db("admin")
      .update({ otp: otp })
      .where("email", email);
    console.log(response);
    return !_.isEmpty(response) ? response : null;
  } catch (error) {
    console.log(error);
  }
};


//AdminOtpbasedLogin
module.exports.adminLoginOtpVerification = async (props) => {
  try {
    const { email, otp } = props;
    const response = await db("admin")
      .select("email", "otp")
      .where("otp", otp)
      .where("email", email);
    console.log(response);
    return !_.isEmpty(response) ? response : null;
  } catch (error) {
    console.log(error);
  }
};

//Engine on/off
module.exports.engine = async (props) => {
  try {
    const { type } = props;
    const onTime = new moment().format("MMMM Do YYYY, h:mm:ss a");
    const offTime = new moment().format("MMMM Do YYYY, h:mm:ss a");

    if (!_.isEmpty(type)) {
      const on = await db("engine").insert({ onTime: onTime, type: type });
      return !_.isEmpty(on) ? on : null;
    } else {
      const off = await db("engine").insert({ offTime: offTime, type: type });
      return !_.isEmpty(off) ? off : null;
    }
  } catch (error) {
    console.log(error);
  }
};

//settings
module.exports.settings = async (props) => {
  const lucy = new moment().format("h:mm:ss");
  const chiti = new moment().format("h:mm:ss");
  const sofia = new moment().format("h:mm:ss");
  const jarvis = new moment().format("h:mm:ss");

  const {
    script,
    money_heist,
    berlin,
    professor,
    tokyo,
    nairobi,
    rackel,
    entry_limit,
    cycle_limit
  } = props;

  try {
    const response = await db("settings").insert({
      script: script,
      money_heist: money_heist,
      berlin: berlin,
      professor: professor,
      tokyo: tokyo,
      nairobi: nairobi,
      rackel: rackel,
      entry_limit: entry_limit,
      cycle_limit: cycle_limit,
      lucy: lucy,
      chiti: chiti,
      sofia: sofia,
      jarvis: jarvis
    });
console.log(response);
    return !_.isEmpty(response) ? response : null;
  } catch (error) {
    console.log(error);
  }
};


//forgot Password
module.exports.forgotPassword = async(props) => {
  try {
    const { email, otp } = props
    const response = await db('user').insert({email:email, otp:otp})
    !_.isEmpty(response) ? response : null;
  } catch (error) {
    console.log(error);
  }
}