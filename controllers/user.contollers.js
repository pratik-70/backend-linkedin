// write the business logic
const User = require("../models/User.model");
// importing bcrypt
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")

// CRUD 

// controller for signup
//  ->. async, await
// Store a user -> mongodb user model
// Server (index.js) -> mongodb server (to store a user)

const signup = async(req, res) => {
  try{
    // body/
    //  req.body;
    /*
     {
       username : "abc",
       email : "abc@gmail.com",
       password : 123
     }
    */

    const {username, email, password} = req.body;

    // checking whether all fields are required

    if(!username || !email || !password){
      return res.status(400).json({message : "All fields are required!"})
    }

    // step 2

    // check whether user already exists

    const existingUser = await User.findOne({email});

    if(existingUser){
      throw new Error("User already exists")
    }

    // step -> hashing password

    const hashedPassword = await bcrypt.hash(password, 10);
    // $655r76e7rte7t67rtygftydgstyru

    // step 3 -> creating a new user

    const user = new User({
      username,
      email,
      password : hashedPassword
    })
    // {
    //   username : "abc",
    //   email : "abc@gmail.com",
    //   password : "123"
    // }

    // save user
    await user.save()

    // return a response

    return res.status(201).json({message : "User created successfully", user})

  }catch(err){
    console.log("err", err.message)
  }
}

// signin controller

const signin = async(req, res) => {
  // req -> request (frontend / api testing)
  // res ->  response (sent from backend to frontend)
  try{
    const {email, password} = req.body;
    // email -> abc@gmail.com
    // password = 123
    // steps

    // step 1 -> check whether the user exists by email

    const user = await User.findOne({email});

    // ! -> false
    if(!user){
      return res.status(404).json({message : "User doesn't exist with this email"})
    }
    // 404 = Not found

    // step 2 -> check whether the password is same

    // 2b$10$DVx4ScKB5cSf8MFqV9cciuu9cFZZQ0a3Bepn90XKzE.H8NsqLyBIO
    // actual value = 123

    const isValidPassword = await bcrypt.compare(password, user.password);

    if(!isValidPassword){
      return res.status(400).json({message : "Passwords don't match. Please try again"})
    }
    // 400 = Bad request


    // create token

    // 1) create token data

    const tokenData = {
       id : user._id
    }

    // token

    const token = await jwt.sign(tokenData, process.env.JWT_SECRET_KEY, {expiresIn : "1h"});

    console.log("token", token)

    // store token as cookie

    res.cookie("access_token", token, {httpOnly : true})

    const loginTime = new Date();
    user.lastLogin = loginTime;

    // abcdefghijklmnopnehal + id
    // $67w35476476eyurfgeyehfiuehry78ey6r783eyruihu8ryueyr3478ryuieyr

    // status code 200 = OK (successful response)
    return res.status(200).json({message : "User logged in successfully", user})


  }catch(err){
    console.log("err", err.message)
  }
}


module.exports = {signup, signin}