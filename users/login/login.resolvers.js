import client from "../../client.js"
import jwt from "jsonwebtoken"
const bcrypt = require('bcrypt');

export default {
    Mutation: {
        login: async (_, {
            username,
            password
        }) => {
            const user = await client.user.findFirst({
                where: {
                    username
                }
            })
            if(!user){
                return {
                    ok: false,
                    error: "User not found"
                }
            }
    
            const passwordOK = await bcrypt.compare(password, user.password);
            if(!passwordOK){
                return {
                    ok: false,
                    error: "Incorrect password"
                }
            }

            const token = await jwt.sign({id: user.id}, process.env.SECRET_KEY);
            return{
                ok: true,
                token
            }
        }
    }
}