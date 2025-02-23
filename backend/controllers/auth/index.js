const AuthController = require("./authController");

module.exports = class Auth {
    async Signin(req, res) {
        try {
            const result = await new AuthController().signin(req.body);
            res.status(200).send({
                success: true,
                data: result
            });
        } catch (error) {
            console.log(error);
            res.status(500).send({ success: false, message: error.message || "Something went wrong!" });
        }
    }
    async Signup(req, res) {
        try {
            const result = await new AuthController().signup(req.body);
            res.status(200).send({
                success: true,
                data: result
            });
        } catch (error) {
            console.log(error);
            res.status(500).send({ success: false, message: error.message || "Something went wrong!" });
        }
    }
    async VerifyOtp(req, res) {
        try {
            const result = await new AuthController().verifyOtp(req.body);
            res.status(200).send({
                success: true,
                data: result
            });
        } catch (error) {
            console.log(error);
            res.status(500).send({ success: false, message: error.message || "Something went wrong!" });
        }
    }
} 