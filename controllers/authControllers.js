const User = require("../models/User");
const AsyncManager = require("../utils/asyncManager");

const cookieTokenResponse = (user, statusCode, res) => {
    const token = user.signJwtToken();

    const cookieOptions = {
        expires: new Date(
            Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
        ),
        httpOnly: true,
    };
    if (process.env.NODE_ENV === "production") {
        cookieOptions.secure = true;
    }
    user.password = undefined;

    res.status(statusCode).cookie("facade", token, cookieOptions).json({
        message: "success",
        token,
        data: {
            user,
        },
    });
};

// $-title   Register User
// $-path    POST /api/v1/register
// $-auth    Public
exports.registerUser = AsyncManager(async (req, res, next) => {
    const { name, email, password, confirmPassword } = req.body;

    const newUser = await User.create({
        name,
        email,
        password,
        confirmPassword,
    });

    cookieTokenResponse(newUser, 201, res);
});
