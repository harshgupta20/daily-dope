const { PrismaClient } = require('@prisma/client');
const { generateOTP } = require('../../utils/helperFunction');
const { signJwt } = require('../../utils/jwt');
const { sendMail } = require('../../utils/emailService');
const otpTemplate = require('../../utils/emailTemplates/otpTemplate');
const welcomeTemplate = require('../../utils/emailTemplates/welcomeTemplate');
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

                console.log("here1");
                sendMail(email, "Welcome to Daily Dope!", welcomeTemplate(email));
                console.log("here2");
            }
            else {
                await prismaClient.user.update({
                    where: { email },
                    data: { otp }
                })
            }

            console.log(email)
            const emailStatus = await sendMail(email, "OTP Verification - Daily Dope", otpTemplate(email, otp));
            console.log(emailStatus)
            return { newUser };
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