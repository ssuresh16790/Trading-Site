const authService = require("../Services/authService");
const _ = require("lodash");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const otpGenerator = require("otp-generator");
const mailService = require("../config/mailService");

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
    console.log(response);
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
    Response: "Incorrect Email or Password",
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

    const otp = otpGenerator.generate(6, {
      upperCase: false,
      specialChars: false,
      alphabets: false,
    });

    const { error } = authSchema.validate(req.body);
    if (error) {
      return res.send({
        status: false,
        Response: error.message,
      });
    }
    const response = await authService.userLogin(req.body);
    response.otp = otp;
    if (!_.isEmpty(response)) {
      return res.send({
        status: true,
        Message: "Login Successfully!",
        Response: response,
      });
    }
  } catch (error) {
    console.log(error);
  }
  return res.send({
    status: false,
    Message: "Username or Password Incorrect!",
  });
};

//adminMail OTP Login
module.exports.mailotp = async (req, res) => {
  try {
    const mail = await mailService.sendingmail(req.body);
    if (!_.isEmpty(mail)) {
      res.send({
        status: true,
        message: "Mail Sent Successfully",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(200).json({
      message: "OK",
    });
    return res.send({
      status: false,
      message: "Mail sent Failed",
    });
  }
};


module.exports.otpUserlogin = async(req, res) => {
  try {
    const response = await authService.otpUserlogin(req.body)
    if (!_.isEmpty(response)) {
      res.send({
        status : true, 
        Response : response
      })
    }
  } catch (error) {
    console.log(error);
  }
  return res.send({
    status : false,
    Response : "Enter Valid OTP"
  })
}