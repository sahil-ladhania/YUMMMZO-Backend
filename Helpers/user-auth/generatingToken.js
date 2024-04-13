import jwt from 'jsonwebtoken';

// Generating Token 
export const generatingJWT = async(payload , secret_key) => {
    try{
        const token = jwt.sign(payload , secret_key);
        return token;
    }
    catch(error){
        console.log(error);
        throw error;
    }
}