const { PrismaClient } = require('@prisma/client');
const { generateOTP } = require('../../utils/helperFunction');
const { signJwt } = require('../../utils/jwt');
require('dotenv').config();

const prismaClient = new PrismaClient();

module.exports = class AuthController {
    async signin(requestBody) {
        try {

            const { email, password } = requestBody;

            if (!email || !password) {
                throw new Error("Required data missing.");
            }

            const response = prismaClient.user.findFirst({
                where: {email, password}
            });

            if(!response){
                throw new Error("Email/Password are wrong.");
            }

            const otp = generateOTP();
            
            return {otp,...response};
        } catch (error) {
            throw error;
        }
    }
    async signup(requestBody) {
        try {
            const { email } = requestBody;

            if (!email) {
                throw new Error("Required data is missing.");
            }

            const isUserExist = await prismaClient.user.findFirst({
                where: {
                    email: email,
                }
            });

            const otp = generateOTP();

            let newUser = {};
            if (!isUserExist) {
                newUser = await prismaClient.user.create({
                    data: { email, otp }
                })
            }
            else {
                await prismaClient.user.update({
                    where: { email },
                    data: { otp }
                })
            }

            return { newUser, otp };
        } catch (error) {
            throw error;
        }
    }
    async verifyOtp(requestBody) {
        try {
            const { email, otp } = requestBody;

            if (!email || !otp) {
                throw new Error("Required data missing.");
            }

            const userInfo = await prismaClient.user.findFirst({
                where: { email }
            });

            if (!userInfo) {
                throw new Error("No user found.");
            }

            console.log(userInfo, otp)

            if (!(Number(userInfo?.otp) == Number(otp))) {
                throw new Error("Wrong OTP");
            }

            const updateUser = await prismaClient.user.update({
                where: {
                    email,
                    otp
                },
                data: {
                    otp: null
                },
            })

            const token = signJwt(updateUser);
            return {
                ...updateUser,
                token
            }

        } catch (error) {
            throw error;
        }
    }
}