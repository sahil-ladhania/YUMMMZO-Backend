import bcrypt from "bcrypt";

// Hashing Password
export const hashingPassword = async(password) => {
    try{
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password , saltRounds);
        return hashedPassword;
    }
    catch(error){
        console.log(error);
        throw error;
    }
}