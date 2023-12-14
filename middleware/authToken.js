const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const accessToken = req.headers['accessToken']
    const refreshToken = req.headers['refreshToken']

    if(!accessToken && refreshToken) {
        return res.send("A Token is required for Authentication");
    }
    try {
        const decodedAccesstoken = jwt.verify(accessToken, process.env.ACCESS_TOKEN);
        req.user = decodedAccesstoken;

        const decodedRefreshtoken = jwt.verify(accessToken, process.env.ACCESS_TOKEN);
        req.user = decodedRefreshtoken;

    } catch (error) {
        console.log('Error  ', error);
        return res.send("Invalid Token");
    }
    return next();
}

module.exports = verifyToken;