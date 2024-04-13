import { PrismaClient } from "@prisma/client";
import { hashingPassword } from "../../Helpers/user-auth/hashingPassword.js";
const prisma = new PrismaClient();

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
export const userLogin = (req , res) => {

}

// For Getting All Users
export const getAllUsers = (req , res) => {

}

// For Getting a Specific User
export const getSpecificUser = (req , res) => {

}
