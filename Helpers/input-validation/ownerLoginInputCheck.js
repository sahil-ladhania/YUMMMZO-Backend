import { z } from "zod";

// Defining Schema For Owner Login Form
const ownerLoginSchema = z.object({
    email : z.string().min(3).max(50),
    password : z.string().min(3).max(50)
})
console.log(ownerLoginSchema);

export const validateOwnerLoginInput = async(inputData) => {
    try{
        console.log(inputData);
        const validatedData = await ownerLoginSchema.parseAsync(inputData);
        console.log(validatedData);
        return validatedData;
    }
    catch(error){
        console.log(error);
        throw error;
    }
}