import { z } from "zod";

// Defining Schema For User Login Form
const userLoginSchema = z.object({
    email : z.string().min(3).max(50),
    password : z.string().min(3).max(50)
})
console.log(userLoginSchema);

export const validateUserLoginInput = async(inputData) => {
    try{
        console.log(inputData);
        const validatedData = await userLoginSchema.parseAsync(inputData);
        console.log(validatedData);
        return validatedData;
    }
    catch(error){
        console.log(error);
        throw error;
    }
}