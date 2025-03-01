const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();

// ROUTERS
const UserRouter = require("./routers/UserRouter");
const AuthRouter = require("./routers/AuthRouter");

const cloudinaryUpload = require("./utils/cloudinaryUpload");
// const sendEmail = require("./utils/emailService");
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json({ limit: "50mb" })); // Increase limit to 50MB
app.use(express.urlencoded({ extended: true, limit: "50mb" })); // Increase limit for form data

app.use("/v1/user", UserRouter);
app.use("/v1/auth", AuthRouter);

app.post("/test", async (req, res) => {
    try {
        const { image, option, text } = req.body;

        const uploadResult = await cloudinaryUpload(image, "test");
        res.status(200).send({ success: true, data: uploadResult });
    } catch (error) {
        console.log(error);
        res.status(500).send({ success: false, error: error.message || "Something went wrong!" });
    }
});

app.get("/test-email", async (req, res) => {
    try {
        // const response = await sendEmail("Test Name", "hgupta42774@gmail.com", "<h1>OTP : 9090</h1>");
        // const response = await sendEmail('hgupta42774@gmail.com', 'Test Email', 'This is a test email.', '<b>This is a test email.</b>');
        res.status(200).send({ success: true, data: "response" })
    }
    catch (error) {
        res.status(500).send({ success: false, message: error?.message })
    }
})

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.listen(port, () => {
    console.log("Example app listening on port 3000!");
});
