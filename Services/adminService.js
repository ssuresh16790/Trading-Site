const adminController = require("../Controllers/adminController");
const db = require("../config/database");
const _ = require('lodash');
const bcrypt = require('bcrypt');



//CRUD for User
module.exports.viewUser = async () => {
  try {
    const response = await db("user").select("*");
    return !_.isEmpty(response) ? response : null;
  } catch (error) {
    console.log(error);
  }
};

module.exports.addUser = async (props) => {
  try {
    const {
      firstName,
      lastName,
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

module.exports.updateUser = async (props) => {
  try {
    const { id, firstName, lastName, email, mobileNumber, password, type, address } = props;
    const response = await db("user").where({id})
      .update({
        firstName,
        lastName,
        email,
        mobileNumber,
        password,
        type,
        address});
        console.log(response);
      return !_.isEmpty(response) ? response : null

  } catch (error) {
    console.log(error);
  }
};

module.exports.deleteUser = async(props) => {
    try {
        const { id } = props
        const response = await db('user').where({id}).delete();
        !_.isEmpty(response) ? response : null
    } catch (error) {
        console.log(error);
    }
}

//Check Email is Exist
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


//viewAllUsers
module.exports.freeUserList = async (props) => {
  try {
    const response = await db("user").select("*").where("type", "=", "free");
    return !_.isEmpty(response) ? response : null;
  } catch (error) {
    console.log(error);
  }
};

module.exports.premiumUserList = async () => {
  try {
    const response = await db("user").select("*").where("type", "=", "premium");
    return !_.isEmpty(response) ? response : null;
  } catch (error) {
    console.log(error);
  }
};

//usersCountList
module.exports.freeUsersCount = async () => {
  try {
    const response = await db("user").count("* as count").where("type", "free");
    return response ? response : null;
  } catch (error) {
    console.log(error);
  }
};

module.exports.premiumUsersCount = async () => {
  try {
    const response = await db("user")
      .count("* as count")
      .where("type", "premium");
    return response ? response : null;
  } catch (error) {
    console.log(error);
  }
};
