const User = require("../models/userModel");
const ErrorResponse = require("../utils/ErrorResponse");

const registerUserController = async (req, res, next) => {
    const { userName, email, password } = req.body;
    try {

        const existingEmail = await User.findOne({ email });

        if (existingEmail) {
            return next(new ErrorResponse('User is Already Exists ', 401))
        }

        const user = await User.create({
            userName,
            email,
            password
        })

        sendToken(user, res)
    } catch (error) {
        console.log(error)
        next(error)

    }
}
const loginUserController = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        if (!email || !password) {
            return next(new ErrorResponse('Email and Password is Mendatory for log in '))
        }

        const user = await User.findOne({ email });

        if (!user) {
            return next(new ErrorResponse('User not resgistered please sign up', 404))
        }

        const isMatched = await user.matchPassword(password)

        if (!isMatched) {

            return next('Incorrect Email Or Password', 401)
        }

        sendToken(user, res)

    } catch (error) {
        console.log(error)
        next(error)

    }
}
const logoutUserController = (req, res) => {
    res.clearCookie('refreshToken')
    return res.status(200).json({
        success: true,
        message: 'Logout Successfully'
    })
}

const sendToken = async (user, res) => {
    const token = await user.getSingedToken(res);
    res.status(200).json({
        success: true,
        token
    })
}


module.exports = {
    registerUserController,
    loginUserController,
    logoutUserController,
    sendToken
}
















































































