import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'

//@desc Auth user/set token
//route POST/api/users
//@access Public
const authUser = asyncHandler((req,res)=>{
    res.status(200).json({message:'Auth User'})
}); 

//@desc Register a new user
//route POST/api/users
//@access Public
const registerUser = asyncHandler(async (req,res)=>{
    const { name, email, password } = req.body

    const userExists = await User.findOne({email});

    if(userExists) {
        res.status(400);
        throw new Error('User already exists')
    }

    const user = await User.create({
        name,
        email,
        password
    }) 

    //confiorm user is created
    if(user){
        res.status(201).json({
            _id:user._id,
            name:user.name,
            email:user.email
        })
    }else{
        res.status(400);
        throw new Error('Invalid user data')
    }
});

//@desc Logout User
//route POST/api/users/logout
//@access Public
const logoutUser = asyncHandler((req,res)=>{
    res.status(200).json({message:'Logout user'})
})

//@desc Get User Profile
//route Get/api/users/profile
//@access Private
const getUserProfile = asyncHandler((req,res)=>{
    res.status(200).json({message:'User Profile'})
})

//@desc update user profile
//route PUT/api/users/profile
//@access Private
const updateUserProfile = asyncHandler((req,res)=>{
    res.status(200).json({message:'Update User Profile'})
})

export { authUser,
         registerUser,
         logoutUser,
         getUserProfile,
         updateUserProfile
    }