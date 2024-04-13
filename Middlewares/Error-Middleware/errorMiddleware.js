
// Handling Error Globally 
export const handleErrorGlobally = (err , req , res , next) => {
    const status = err.status || 500;
    const message = err.message || "Internal Server Error";
    const extraMessage = err.extraMessage || "Backend Error";
    return res.status(status).send({
            Status : status,
            Message : message,
            ExtraMessage : extraMessage
        });
}