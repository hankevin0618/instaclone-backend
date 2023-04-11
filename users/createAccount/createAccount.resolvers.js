import client from "../../client.js"
const bcrypt = require('bcrypt');

export default {
    Mutation: {
        createAccount: async (_, {
            firstName,
            lastName,
            username,
            email,
            password,
        }) => {
            try {
                // check if username or email are already in DB
                const existingUser = await client.user.findFirst({
                    where: {
                        OR: [
                            {
                                username
                            },
                            {
                                email
                            }
                        ]
                    }
                });
                if(existingUser){
                    throw new Error("This username or email is already in use")
                }
                
                const uglyPassword = await bcrypt.hash(password, 10);
                return client.user.create({
                    data: {
                        username,
                        email,
                        firstName,
                        lastName,
                        password: uglyPassword
                    }
                })    


                // hash password
                // save and return the user
            } catch (error) {
                return error;
            }
        },
        
    }
}