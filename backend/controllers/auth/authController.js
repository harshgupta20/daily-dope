const { PrismaClient } = require('@prisma/client');
const { generateOTP } = require('../../utils/helperFunction');
const { signJwt } = require('../../utils/jwt');
require('dotenv').config();

const prismaClient = new PrismaClient();

module.exports = class AuthController {
    async signin(requestBody) {
        try {
            return "data";
        } catch (error) {
            throw error;
        }
    }
    async signup(requestBody) {
        try {
            const { name, email, password } = requestBody;

            if (!name || !email || !password) {
                throw new Error("Required data is missing.");
            }

            const isUserExist = await prismaClient.user.findFirst({
                where: {
                    email: email,
                }
            });

            if (isUserExist && isUserExist?.userVerified) {
                throw new Error("User already exist with this email.");
            }

            const otp = generateOTP();

            let newUser = {};
            if (!isUserExist) {
                console.log("new user created")
                newUser = await prismaClient.user.create({
                    data: { name, email, password, otp }
                })
            }
            else{
                await prismaClient.user.update({
                    where: {email},
                    data: {otp}
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
                where: {email}
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
                    userVerified: true,
                    otp: null
                },
            })

            const token = signJwt(userInfo);
            return {
                ...userInfo,
                token
            }

        } catch (error) {
            throw error;
        }
    }
}