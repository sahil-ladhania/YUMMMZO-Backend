import bcrypt from 'bcrypt';

// Comparing Old Password With Hashed One In DB
export const comparingOldPassword = async(old_password , hashed_password) => {
    try{
        const isMatch = await bcrypt.compare(old_password , hashed_password);
        console.log(isMatch);
        return isMatch;
    }
    catch(error){
        console.log(error);
        throw error;
    }
}