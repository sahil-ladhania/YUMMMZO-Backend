import { z } from "zod";

// Defining Schema For Changing Password Form For Both User And Owner
const changePasswordSchema = z.object({
    old_password : z.string().min(8).max(20),
    new_password : z.string().min(8).max(20)
})
console.log(changePasswordSchema);

export const validateChangePasswordInput = async(inputData) => {
    try{
        console.log(inputData);
        const validatedData = await changePasswordSchema.parseAsync(inputData);
        console.log(validatedData);
        return validatedData;
    }
    catch(error){
        console.log(error);
        throw error;
    }
}