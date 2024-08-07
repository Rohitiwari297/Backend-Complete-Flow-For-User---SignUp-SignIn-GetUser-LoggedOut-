const mongoose = require('mongoose');
// JWT Token dependancy
const JWT = require('jsonwebtoken')
//
const  bcrypt = require('bcrypt')



const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required: [true, "Name is required"],
        minLength: [5, 'Name must be at least 5 char'],
        maxLength:[50, 'Name must be less than 50 char'],
        trim: true,

    },
    email : {
        type : String,
        required: [true, "email is required"],
        unique: [true, " Already registered"],
        lowercase: true
    },

    password : {
        type : String,
        select : false,
    },

    forgotPasswordToken : {
        type : String,
    },

    forgotPasswordExpiryDate : {
        type : String,
    },   
},

{
    timestamps :true,
});


// Ceate method for encrypting the user password if Modified -> agar aap password ko encrypt krte hain to signin karte time password ka campare bhi bcrypt.compare(password, user.password) se karna hoga.
userSchema.pre('save', async function(next) {
    if (!this.isModified('password')){
        return next();
    }
    this.password = await bcrypt.hash(this.password, 10);
    return next();
})

//JWT Token method
userSchema.methods = {
    jwtToken() {
        return JWT.sign(
            {id: this._id, email: this.email},
            process.env.SECRET,
            { expiresIn: '24h'}
        )
    }
}

//exports
module.exports = mongoose.model('User', userSchema)