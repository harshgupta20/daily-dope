module.exports = welcomeTemplate = (username="") => (
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
        .cta-button {
            display: inline-block;
            background-color: #5c6bc0; /* Indigo-500 */
            color: #fff;
            padding: 12px 20px;
            font-size: 16px;
            font-weight: bold;
            text-align: center;
            text-decoration: none;
            border-radius: 5px;
            margin: 20px 0;
        }
        .cta-button:hover {
            background-color: #4a5568; /* Darker shade on hover */
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
        <h2>Welcome to Daily Dope!</h2>
        <p>Dear ${username},</p>
        <p>Welcome to the Daily Dope community! We're excited to have you on board.</p>
        <p>To get started, you can visit our homepage and explore the latest content we have for you.</p>
        <p>If you have any questions or need help, don't hesitate to reach out to our support team.</p>
        <footer>
            <p>Best regards,</p>
            <p>The Daily Dope Team</p>
        </footer>
    </div>
</body>
</html>

    `
)