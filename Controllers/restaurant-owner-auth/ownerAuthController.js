import { PrismaClient } from "@prisma/client";
import { config } from 'dotenv';
import { hashingPassword } from "../../Helpers/user-auth/hashingPassword.js";
import { comparingPassword } from "../../Helpers/user-auth/comparingPassword.js";
import { generatingJWT } from "../../Helpers/user-auth/generatingToken.js";
import { comparingOldPassword } from "../../Helpers/user-auth/comparingOldPassword.js";
const prisma = new PrismaClient();
config();

const secret_key = process.env.SECRET_KEY;

// For Owner Signup
export const ownerSignup = async(req , res , next) => {
    try{
        // Getting The Data From Body
        const {first_name , last_name , email , password} = req.body;
        console.log(`first_name : ${first_name}`);
        console.log(`last_name : ${last_name}`);
        console.log(`email : ${email}`);
        console.log(`password : ${password}`);
        // Checking If Owner Has Filled All Feilds
        if(!first_name || !last_name || !email || !password){
            console.log("Pura Form Bhar !!!");
        }
        else{
            // Checking If The Owner Already Exist -----> DB Call
            const existingOwner = await prisma.owner.findUnique({
                where : {
                    email : email
                }
            })
            console.log(existingOwner);
            if(existingOwner !== null){
                console.log("Owner Exist !!!");
            }
            else{
                // Hashing Password
                hashingPassword(password)
                    .then((hashedPassword) => {
                        console.log(hashedPassword);
                        // Saving The Owner In DB ------> DB Hit
                        const savedOwner = prisma.owner.create({
                            data : {
                                first_name : first_name,
                                last_name : last_name,
                                email : email,
                                password : hashedPassword
                            }
                        })
                        console.log(savedOwner);
                        savedOwner
                            .then((savedOwner) => {
                                console.log(savedOwner);
                                res.status(201).send({
                                    Message : "Owner Signup Successfull...",
                                    OwnerData : savedOwner
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

// For Owner Login
export const ownerLogin = async(req , res , next) => {
    try{
        // Getting the Data From Body
        const {email , password} = req.body;
        console.log(`email : ${email}`);
        console.log(`password : ${password}`);
        // Checking If Owner Has Filled All Feilds
        if(!email || !password){
            console.log("Pura Form Bhar !!!");
        }
        else{
            // Checking If The Owner Already Exist -----> DB Call
            const existingOwner = await prisma.owner.findUnique({
                where : {
                    email : email
                }
            })
            console.log(existingOwner);
            if(existingOwner === null){
                console.log("Owner Not Found !!!");
            }
            else{
                // Comparing Passwords
                comparingPassword(password , existingOwner.password)
                    .then((isMatch) => {
                        console.log(isMatch);
                        if(isMatch !== true){
                            console.log("Invalid Credentials !!!");
                        }
                        else{
                            // Define Payload For JWT
                            const payload = {
                                first_name : existingOwner.first_name,
                                last_name : existingOwner.last_name,
                                email : email,
                                role : "OWNER"
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

// For Getting All Owners
export const getAllOwners = async(req , res , next) => {
    try{
        // Getting All Users In DB -----> DB Call
        const allOwners = await prisma.owner.findMany();
        console.log(allOwners);
        if(!allOwners){
            console.log("No Owner Found !!!");
        }
        else{
            res.status(200).send({
                Message : "Successfully Got The Owners From DB ...",
                Users : allOwners
            })
        }
    }
    catch(error){
        next(error);
    }
}

// For Getting A Specific Owner
export const getSpecificOwner = async(req , res , next) => {
    try{
        // Getting The owner_id From Params
        const {owner_id} = req.params;
        console.log(owner_id);
        const owner_id_Int = parseInt(owner_id , 10);
        console.log(owner_id_Int);
        // Getting Owner Based On owner_id -----> DB Call
        const owner = await prisma.owner.findUnique({
            where : {
                owner_id : owner_id_Int
            }
        })
        console.log(owner);
        res.status(200).send({
            Message : "Successfully Got The Owner ...",
            User : owner
        })
    }
    catch(error){
        next(error);
    }
}

// For Changing Password
export const changePassword = async(req , res , next) => {
    try{
        // Get The owner_id From Params
        const {owner_id} = req.params;
        console.log(owner_id);
        const owner_id_Int = parseInt(owner_id , 10);
        console.log(owner_id_Int);
        // Getting The Old Password and New Password From Body
        const {old_password} = req.body;
        console.log(old_password);
        const {new_password} = req.body;
        console.log(new_password);
        // Checking If Owner Exist -----> DB Call
        const existingOwner = await prisma.owner.findUnique({
            where : {
                owner_id : owner_id_Int
            }
        })
        console.log(existingOwner);
        if(existingOwner === null){
            console.log("No Owner Found !!!");
        }
        else{
            // Comparing The Old Password With Hashed Password In DB
            comparingOldPassword(old_password , existingOwner.password)
                .then((isMatch) => {
                    console.log(isMatch);
                    // Hashing The New Password
                    hashingPassword(new_password)
                        .then((newHashedPassword) => {
                            console.log(newHashedPassword);
                            // Update The Old Password With New Password ----> DB Hit
                            const updatePassword =  prisma.owner.update({
                                where : {
                                    owner_id : owner_id_Int
                                },
                                data : {
                                    password : newHashedPassword
                                }
                            })
                            updatePassword
                                .then((updatedOwner) => {
                                    console.log(updatedOwner);
                                    res.status(201).send({
                                        Message : "Password Changed Successfully ...",
                                        UpdatedOwner : updatedOwner
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