const { response } = require('express');
const adminService = require('../Services/adminService');
const _ = require('lodash');
const Joi = require('joi');



//CRUD for Admin Create a User
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
        address : Joi.string().optional()
      });
  
      const { error } = authSchema.validate(req.body);
  
      if (error) {
        return res.send({
          status: false,
          Response: error.message,
        });
      }
  
      var email = req.body.email;
      const isEmailexist = await adminService.checkUser(email);
      if (!_.isNull(isEmailexist)) {
        const response = await adminService.addUser(req.body);
  
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
  
module.exports.updateUser = async(req, res) => {
    try {
        const response = await adminService.updateUser(req.body)
        console.log(response);
        if(response != 0) {
            return res.send({
                status : true,
                Response : "User Updated Successfully"
            })
        }
    } catch (error) {
        console.log(error);
    }
    return res.send({
        status : false,
        Response : "Error Occured User Does not Updated"
    })
}

module.exports.viewUser = async(req, res) => {
    try {
        const response = await adminService.viewUser(req.body)
        if(!_.isEmpty(response)) {
            return res.send({
                status : true,
                Response : response
            })
        }
    } catch (error) {
        console.log(error);
    }
    return res.send({
        status : false,
        Response : response
    })
}

module.exports.deleteUser = async(req, res) => {
    try {
        const response = await adminService.deleteUser(req.body)
        if(response != 0) {
            return res.send({
                status : true,
                Response : "User Deleted Successfully"
            })
        }
    } catch (error) {
        console.log(error);
    }
    return res.send({
        status : false,
        Response : "Error Occured User Does not Deleted"
    })
}


//ViewAllUsers
module.exports.viewAllUsers = async (req, res) => {
    try {
      const freeUserList = await adminService.freeUserList();
      const premiumUserList = await adminService.premiumUserList();
      const freeUsersCount = await adminService.freeUsersCount();
      const premiumUsersCount = await adminService.premiumUsersCount();
  
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

