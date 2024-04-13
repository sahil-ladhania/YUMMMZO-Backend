import bcrypt from 'bcrypt';

// Comparing Password 
export const comparingPassword = async(password , hashedPassword) => {
    try{
        const isMatch = await bcrypt.compare(password , hashedPassword);
        console.log(isMatch);
        return isMatch;
    }
    catch(error){
        console.log(error);
        throw error;
    }
}