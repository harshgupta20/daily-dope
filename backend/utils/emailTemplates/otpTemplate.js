module.exports = otpTemplate = (username="", otp="") => (
    `
    <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #1a202c; /* Dark background */
            color: #e2e8f0; /* Light text color */
            padding: 20px;
            margin: 0;
        }
        .container {
            max-width: 600px;
            margin: auto;
            background-color: #2d3748; /* Dark container background */
            padding: 30px;
            border-radius: 8px;
            border: 1px solid #4a5568; /* Border to give some structure */
        }
        h2 {
            text-align: center;
            color: #5c6bc0; /* Indigo-500 */
        }
        p {
            font-size: 16px;
            line-height: 1.5;
        }
        .otp-code {
            text-align: center;
            font-size: 24px;
            font-weight: bold;
            margin: 20px 0;
            padding: 10px;
            background-color: #4a5568; /* Darker background for OTP code */
            border-radius: 5px;
            color: #5c6bc0; /* Indigo-500 */
        }
        a {
            color: #5c6bc0; /* Indigo-500 */
            text-decoration: none;
        }
        footer {
            text-align: center;
            margin-top: 20px;
            font-size: 14px;
        }
    </style>
</head>
<body>
    <div class="container">
        <h2>OTP Verification - Daily Dope</h2>
        <p>Dear ${username},</p>
        <p>Thank you for choosing Daily Dope! To complete your verification process, please enter the following One-Time Password (OTP) on the verification page:</p>
        <div class="otp-code">
            <span>${otp}</span>
        </div>
        <p>This OTP is valid for the next 10 minutes. If you didn’t request this, please ignore this email.</p>
        <footer>
            <p>Best regards,</p>
            <p>The Daily Dope Team</p>
        </footer>
    </div>
</body>
</html>
`
)