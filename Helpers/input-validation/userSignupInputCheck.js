import { z } from "zod";

// Defining Schema For User Signup Form
const userSignupSchema = z.object({
    first_name : z.string().min(3).max(50),
    last_name : z.string().min(3).max(50),
    email : z.string().min(3).max(50),
    password : z.string().min(3).max(50)
})
console.log(userSignupSchema);

export const validateUserSignupInput = async(inputData) => {
    try{
        console.log(inputData);
        const validatedData = await userSignupSchema.parseAsync(inputData);
        console.log(validatedData);
        return validatedData;
    }
    catch(error){
        console.log(error);
        throw error;
    }
}