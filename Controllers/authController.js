const authService = require("../Services/authService");
const _ = require("lodash");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const otpGenerator = require("otp-generator");
const mailService = require("../config/mailService");
const moment = require("moment");
const FyersAPI = require("fyers-api-v3");
const axios = require('axios');


//addAdmin
module.exports.addAdmin = async (req, res) => {
  try {
    const authSchema = Joi.object({
      firstName: Joi.string().min(3).required(),
      lastName: Joi.string().min(3).required(),
      userName: Joi.string().min(5).max(50),
      email: Joi.string().email().required(),
      mobileNumber: Joi.number().required(),
      password: Joi.string().min(8).required(),
    });

    const { error } = authSchema.validate(req.body);

    if (error) {
      return res.send({
        status: false,
        Response: error.message,
      });
    }

    var email = req.body.email;
    const isEmailexist = await authService.checkUser(email);
    if (!_.isNull(isEmailexist)) {
      const response = await authService.addAdmin(req.body);
      if (response) {
        return res.send({
          status: true,
          Response: response,
          Message: "Admin Added Successfully!",
        });
      }
    } else {
      return res.send({
        status: false,
        Response: "Already Email Exist",
      });
    }
  } catch (error) {
    console.log(error);
  }
  return res.send({
    status: false,
    Message: "Admin insert Failed",
  });
};

//userLogin
module.exports.userLogin = async (req, res) => {
  try {
    const authSchema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().min(8).required(),
    });

    const { error } = authSchema.validate(req.body);
    if (error) {
      return res.send({
        status: false,
        Response: error.message,
      });
    }
    const response = await authService.userLogin(req.body);
    if (!_.isEmpty(response)) {
      var otp = otpGenerator.generate(6, {
        digits: true,
        upperCase: false,
        specialChars: false,
        alphabets: false,
      });
      var email = req.body.email;
      const sendOtp = await mailService.sendOtpForLogin(email, otp);
      if (!_.isNull(sendOtp)) {
        const updateOtp = await authService.updateOtpForUser(email, otp);
        if (!_.isNull(updateOtp)) {
        }
      }
      return res.send({
        status: true,
        Message: "Otp Sent Successfully",
      });
    }
  } catch (error) {
    console.log(error);
  }
  return res.send({
    status: false,
    Message: "Something Went Wrong!",
  });
};

//adminMail OTP Login

module.exports.userLoginOtpVerification = async (req, res) => {
  try {
    const authSchema = Joi.object({
      email: Joi.string().email().required(),
      otp: Joi.string().min(6).required(),
    });

    const { error } = authSchema.validate(req.body);
    if (error) {
      return res.send({
        status: false,
        Response: error.message,
      });
    }
    const response = await authService.userLoginOtpVerification(req.body);
    if (!_.isEmpty(response)) {
      return res.send({
        status: true,
        Response: "Login Success",
      });
    }
  } catch (error) {
    console.log(error);
  }
  return res.send({
    status: false,
    Response: "Enter Valid OTP",
  });
};

//adminLogin
module.exports.adminLogin = async (req, res) => {
  try {
    const authSchema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().min(8).required(),
    });

    const { error } = authSchema.validate(req.body);
    if (error) {
      return res.send({
        status: false,
        Response: error.message,
      });
    }
    const response = await authService.adminLogin(req.body);
    if (!_.isEmpty(response)) {
      var otp = otpGenerator.generate(6, {
        digits: true,
        upperCase: false,
        specialChars: false,
        alphabets: false,
      });
      var email = req.body.email;
      const sendOtp = await mailService.sendOtpForLogin(email, otp);
      if (!_.isNull(sendOtp)) {
        const updateOtp = await authService.updateOtpForAdmin(email, otp);
        if (!_.isNull(updateOtp)) {
        }
      }
      return res.send({
        status: true,
        Message: "Otp Sent Successfully",
      });
    }
  } catch (error) {
    console.log(error);
  }
  return res.send({
    status: false,
    Message: "Something Went Wrong!",
  });
};

//adminOtpverify
module.exports.adminLoginOtpVerification = async (req, res) => {
  try {
    const authSchema = Joi.object({
      email: Joi.string().email().required(),
      otp: Joi.string().min(6).required(),
    });

    const { error } = authSchema.validate(req.body);
    if (error) {
      return res.send({
        status: false,
        Response: error.message,
      });
    }

    const response = await authService.adminLoginOtpVerification(req.body);
    if (!_.isEmpty(response)) {
      return res.send({
        status: true,
        Response: "Login Success",
      });
    }
  } catch (error) {
    console.log(error);
  }
  return res.send({
    status: false,
    Response: "Invalid Credentials",
  });
};

//Engine on/off
module.exports.engine = async (req, res) => {
  try {
    const response = await authService.engine(req.body);
    if (!_.isEmpty(response)) {
      return res.send({
        status: true,
        Message: response,
      });
    }
  } catch (error) {
    console.log(error);
  }
  return res.send({
    status: false,
    message: "error",
  });
};

//settingsForm
module.exports.settings = async (req, res) => {
  try {
    const response = await authService.settings(req.body);
    return res.send({
      status: true,
      Response: response,
      Message: "Added Successfully",
    });
  } catch (error) {
    console.log(error);
  }
  return res.send({
    status: false,
    Response: response,
  });
};


module.exports.fyersApi = async(req, res) => {
  try {

    var fyers = new FyersAPI.fyersModel();
    const appid = req.body.appid
    console.log(appid);
      fyers.setAppId(appid);
      fyers.setRedirectUrl(`https://www.google.com/`);
      var generateAuthcodeURL = fyers.generateAuthCode();
      console.log(generateAuthcodeURL);
      if(!_.isEmpty(generateAuthcodeURL)) {
        return res.send({
          s : "OK",
          code : 200,
          message : 'success',
          URL : generateAuthcodeURL

        })
      }
  } catch (error) {
      console.log(error);
  }
  return res.send({
      status : false,
      message : 'error'
  })
}


