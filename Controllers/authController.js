const authService = require("../Services/authService");
const _ = require("lodash");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const otpGenerator = require("otp-generator");
const mailService = require("../config/mailService");
const { response } = require("express");

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

//addUser
module.exports.addUser = async (req, res) => {
  try {
    const authSchema = Joi.object({
      firstName: Joi.string().min(3).required(),
      lastName: Joi.string().min(3).required(),
      userName: Joi.string().min(5).max(50),
      email: Joi.string().email().required(),
      mobileNumber: Joi.number().required(),
      password: Joi.string().min(8).required(),
      type: Joi.string().required(),
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
      const response = await authService.addUser(req.body);

      if (response) {
        return res.send({
          status: true,
          Response: response,
          Message: "User Added Successfully!",
        });
      }
    } else {
      console.log("Already email exist");
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
    Message: "User insert Failed",
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
        const updateOtp = await authService.updateOtp(email, otp);
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

module.exports.otpUserlogin = async (req, res) => {
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
    const response = await authService.otpUserlogin(req.body);
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

//adminOtpLogin

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
        const updateOtp = await authService.updateAdminOtp(email, otp);
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
module.exports.otpAdminlogin = async (req, res) => {
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

    const response = await authService.otpAdminlogin(req.body);
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

//ViewAllUsers
module.exports.viewAllUsers = async (req, res) => {
  try {
    const freeUserList = await authService.freeUserList();
    const premiumUserList = await authService.premiumUserList();
    const freeUsersCount = await authService.freeUsersCount();
    const premiumUsersCount = await authService.premiumUsersCount();
    if (!_.isEmpty(freeUserList)) {
      return res.send({
        status: true,
        FreeUsers_List: freeUserList,
        PremiumUser_List: premiumUserList,
        FreeUsers_Count: freeUsersCount,
        PremiumUsers_Count: premiumUsersCount,
      });
    }
  } catch (error) {
    console.log(error);
  }
  return res.send({
    status: false,
    Response: "Result's Not Found",
  });
};
