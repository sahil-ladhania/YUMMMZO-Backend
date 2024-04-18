import { PrismaClient } from "@prisma/client";
import { config } from 'dotenv';
import jwt from 'jsonwebtoken';
import { hashingPassword } from "../../Helpers/user-auth/hashingPassword.js";
import { comparingPassword } from "../../Helpers/user-auth/comparingPassword.js";
import { generatingJWT } from "../../Helpers/user-auth/generatingToken.js";
import { comparingOldPassword } from "../../Helpers/user-auth/comparingOldPassword.js";
const prisma = new PrismaClient();
config();

const secret_key = process.env.SECRET_KEY;

// For User Signup
export const userSignup = async(req , res , next) => {
    try{
        // Getting the Data From Body
        const {first_name , last_name , email , password} = req.body;
        console.log(`first_name : ${first_name}`);
        console.log(`last_name : ${last_name}`);
        console.log(`email : ${email}`);
        console.log(`password : ${password}`);
        // Checking If User Has Filled All Feilds
        if(!first_name || !last_name || !email || !password){
            console.log("Pura Form Bhar !!!");
        }
        else{
            // Checking If The User Already Exist -----> DB Call
            const existingUser = await prisma.user.findUnique({
                where : {
                    email : email
                }
            });
            console.log(existingUser);
            if(existingUser !== null){
                console.log("User Exist !!!");
            }
            else{
                // Hashing Password
                hashingPassword(password)
                    .then((hashedPassword) => {
                        console.log(`Hashed Password : ${hashedPassword}`);
                        // Saving The User In DB ------> DB Hit
                        const savedUser = prisma.user.create({
                            data : {
                                first_name : first_name,
                                last_name : last_name,
                                email : email,
                                password : hashedPassword
                            }
                        })
                        console.log(savedUser);
                        savedUser
                            .then((savedUser) => {
                                console.log(savedUser);
                                res.status(201).send({
                                    Message : "User Signup Successfull...",
                                    UserData : savedUser
                                })
                            })
                            .catch((error) => {
                                next(error);
                            })
                    })
                    .catch((error) => {
                        next(error);
                    })
            }
        }
    }
    catch(error){
        next(error);
    }
}

// For User Login
export const userLogin = async(req , res , next) => {
    try{
        // Getting the Data From Body
        const {email , password} = req.body;
        console.log(`email : ${email}`);
        console.log(`password : ${password}`);
        // Checking If User Has Filled All Feilds
        if(!email || !password){
            console.log("Pura Form Bhar !!!");
        }
        else{
            // Checking If The User Already Exist -----> DB Call
            const existingUser = await prisma.user.findUnique({
                where : {
                    email : email
                }
            })
            console.log(existingUser);
            if(existingUser === null){
                console.log("User Not Found !!!");
            }
            else{
                // Comparing Passwords
                comparingPassword(password , existingUser.password)
                    .then((isMatch) => {
                        if(isMatch !== true){
                            console.log("Invalid Credentials !!!");
                        }
                        else{
                            // Define Payload For JWT
                            const payload = {
                                first_name : existingUser.first_name,
                                last_name : existingUser.last_name,
                                email : email,
                                role : "USER"
                            }
                            console.log(typeof(payload));
                            console.log(payload);
                            console.log(`Secret Key : ${secret_key}`);
                            // Generate Token
                            generatingJWT(payload , secret_key)
                                .then((JWT_Token) => {
                                    console.log(JWT_Token);
                                    // Sending JWT To Client Via Cookie
                                    res.cookie("JWT_TOKEN" , JWT_Token);
                                    res.status(200).send({
                                        Message : "User Login Successfull ..."
                                    })
                                })
                                .catch((error) => {
                                    next(error);
                                })
                        }
                    })
                    .catch((error) => {
                        next(error);
                    })
            }
        }
    }
    catch(error){
        next(error);
    }
}

// For Getting All Users
export const getAllUsers = async(req , res , next) => {
    try{
        // Getting All Users In DB -----> DB Call
        const allUsers = await prisma.user.findMany();
        console.log(allUsers);
        if(!allUsers){
            console.log("No User Found !!!");
        }
        else{
            res.status(200).send({
                Message : "Successfully Got The Users From DB ...",
                Users : allUsers
            })
        }
    }
    catch(error){
        next(error);
    }
}

// For Getting a Specific User
export const getSpecificUser = async(req , res , next) => {
    try{
        // Getting The user_id From Params
        const {user_id} = req.params;
        console.log(user_id);
        const user_id_Int = parseInt(user_id , 10);
        console.log(user_id_Int);
        // Getting User Based On user_id -----> DB Call
        const user = await prisma.user.findUnique({
            where : {
                user_id : user_id_Int
            }
        })
        console.log(user);
        res.status(200).send({
            Message : "Successfully Got The User ...",
            User : user
        })
    }
    catch(error){
        next(error);
    }
}

// For Updating The Password
export const changePassword = async(req , res , next) => {
    try{
        // Get The user_id From Params
        const {user_id} = req.params;
        console.log(user_id);
        const user_id_Int = parseInt(user_id , 10);
        console.log(user_id_Int);
        // Getting The Old Password and New Password From Body
        const {old_password} = req.body;
        console.log(old_password);
        const {new_password} = req.body;
        console.log(new_password);
        // Checking If User Exist -----> DB Call
        const existingUser = await prisma.user.findUnique({
            where : {
                user_id : user_id_Int
            }
        })
        console.log(existingUser);
        if(existingUser === null){
            console.log("No User Found !!!");
        }
        else{
            // Comparing The Old Password With Hashed Password In DB
            comparingOldPassword(old_password , existingUser.password)
                .then((isMatch) => {
                    console.log(isMatch);
                    // Hashing The New Password
                    hashingPassword(new_password)
                        .then((newHashedPassword) => {
                            console.log(newHashedPassword);
                            // Update The Old Password With New Password ----> DB Hit
                            const updatePassword =  prisma.user.update({
                                where : {
                                    user_id : user_id_Int
                                },
                                data : {
                                    password : newHashedPassword
                                }
                            })
                            updatePassword
                                .then((updatedUser) => {
                                    console.log(updatedUser);
                                    res.status(201).send({
                                        Message : "Password Changed Successfully ...",
                                        UpdatedUser : updatedUser
                                    })
                                })
                                .catch((error) => {
                                    next(error);
                                })
                        })
                        .catch((error) => {
                            next(error);
                        })
                })
                .catch((error) => {
                    next(error);
                })
        }
    }
    catch(error){
        next(error);
    }
}