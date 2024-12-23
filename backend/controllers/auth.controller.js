import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import generateTokenAndSetCookie from '../utils/generateToken.js';

export const signup = async (req, res) => {
  try {
    const { fullName, username, password, confirmPassword, gender } = req.body;

    if (password !== confirmPassword) {
      return res.status(400).json({error: "Passwords do not match"});
    }

    const user = await User.findOne({username});

    if (user) {
      return res.status(400).json({error: "Username already exists"})
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);


    const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
    const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

    const newUser = new User({
      fullName,
      username,
      password:hashedPassword,
      gender,
      profilePic: gender === "male" ? boyProfilePic : girlProfilePic
    })

    //Generate token
    generateTokenAndSetCookie(newUser._id, res);

    await newUser.save();

    res.status(201).json({
      _id: newUser._id,
      fullName: newUser.fullName,
      username: newUser.username,
      profilePic: newUser.profilePic,
    });
  }
  catch (error){
    console.log("Error in signup controller", error.message);
    res.status(500).json({error: "internal Server error"});
  }
}

export const login = (req, res) => {

}

export const logout = (req, res) => {

}