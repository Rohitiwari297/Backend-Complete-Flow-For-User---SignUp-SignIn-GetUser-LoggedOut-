
const userModel = require('../model/useSchema')
// instance of email validator
const emailValidator = require('email-validator')

// signup router
const signup = async (req, res, next) => {
    const { name, email, password, confirmPassword } = req.body
    console.log(name, email, password, confirmPassword)

    //Some use side validations
    if (!name || !email || !password || !confirmPassword) {
        res.status(400).json({
            success: false,
            message: "Every fields are reqruired"
        })
    }

    // validating Email ID
    const validateEmail = emailValidator.validate(email)

    if (!validateEmail) {
        res.status(400).json({
            success: false,
            message: "Please provide a valide Email ID"
        })
    }

    // Validation for password
    if (password !== confirmPassword) {
        res.status(400).json({
            success: false,
            message: "password & cofirmPassword should be same"
        })
    }

    //
    try {
        const userInfo = userModel(req.body)
        const result = await userInfo.save()

        res.status(200).json({
            success: true,
            data: result
        })
    } catch (error) {

        if (error.code === 11000) {
            res.status(400).json({
                success: false,
                message: "Account aleady Register"

            })
        }
        res.status(400).json({
            success: false,
            message: error.message

        })

    }
};

//+++++++++++++++++++++++++++++++++++++++++++++++++++++

// signin router
const signin = async (req, res) => {
    const { email, password } = req.body;

    //validation
    if (!email || !password) {
        res.status(400).json({
            success: false,
            message: "Every field is mandatory"
        })
    }

    //try-catch
    try {
        //Validation Email
        const user = await userModel
            .findOne({
                email
            })
            .select('+password')

        //validation
        //if (!user || user.password !== password) for numarical/bassic password
        if (!user || bcrypt.compare(password, user.password) !== password) {    // for encrypted password
            res.status(400).json({
                success: false,
                message: "Invalid Credentials"
            })
        }

        // Generate token
        const token = user.jwtToken();
        user.password = undefined;

        //Create cookie
        const cookieOption = {
            maxAge: 24 * 60 * 60 * 1000,
            httpOnly: true
        };

        res.cookie('token', token, cookieOption);
        res.status(200).json({
            success: true,
            data: user
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        })
    }


}



//getUser (user data) router
const getUser = async (req, res, next) => {
    const userId = req.user.id;

    try {
        const user = await userModel.findById(userId);
        res.status(200).json({
            success:true,
            data: user
        })
    } catch (error) {
        res.status(400).json({
            success:false,
            message: error.message
        })
    }
}


//Logout User router
const logout = (req, res) => {
    try {
        const cookieOption = {
            expires: new Date(),
            httpOnly: true,
        };
        res.cookie('token', null, cookieOption);
        res.status(200).json({
            success: true,
            message: "Successfull logged Out"
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

module.exports = {
    signup,
    signin,
    getUser,
    logout
}