import { config } from 'dotenv';
import { verifyToken } from '../../Helpers/user-auth/verifyingToken.js';
config();
const secret_key = process.env.SECRET_KEY;

// For Checking If Authorized
export const isAuthorized = (req , res , next) => {
    // Getting The Bearer Token From AuthZ Header
    const authHeader = req.headers.authorization;
    console.log(authHeader);
    // Checking If The AuthZ Header Is There And It Starts With "Bearer "
    if(authHeader && authHeader.startsWith("Bearer ")){
        // Retrieving The JWT Token From AuthZ Header Without "Bearer"
        const token = authHeader.split(" ")[1];
        console.log(token);
        // Verifing Token
        verifyToken(token , secret_key)
            .then((isVerified) => {
                console.log(`Role : ${isVerified.role}`);
                const role = isVerified.role;
                console.log(role);
                // Redirecting To Respected Endpoint Based On Their Roles
                if(role === 'OWNER' && req.path.includes('owner')){
                    next();
                }
                else if(role === 'USER' && req.path.includes('user')){
                    next();
                }
                else{
                    res.status(403).json({
                        Error: 'Forbidden : Insufficient Permissions & Invalid Role !!!'
                    });
                }
            })
            .catch((error) => {
                next(error);
            })
    }
    else{
        return res.status(401).json({
            Error: 'Unauthorized : Missing or Invalid Token !!!'
        });
    }
}