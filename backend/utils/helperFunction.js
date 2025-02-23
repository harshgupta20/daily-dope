function getRandomSixDigitNumber() {
    return Math.floor(100000 + Math.random() * 900000);
}

function generateOTP() {
    let otp = '';
    for (let i = 0; i < 4; i++) {
        otp += Math.floor(Math.random() * 10); // Generates a random number between 0 and 9
    }
    return otp;
}

module.exports = {getRandomSixDigitNumber, generateOTP}
