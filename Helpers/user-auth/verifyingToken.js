import jwt from 'jsonwebtoken';

export const verifyToken = async(token , secret_key) => {
    try{
        console.log(token);
        console.log(secret_key);
        const isVerified =  jwt.verify(token , secret_key);
        console.log(isVerified);
        return isVerified;
    }
    catch(error){
        console.log(error);
        throw error;
    }
}