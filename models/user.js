const { Schema, model } = require("mongoose");
const jwt = require("jsonwebtoken");

const userSchema = Schema(
    {
        name: {
            type: String,
        },
        email: {
            type: String,
            required: true,
            maxlength: 150,
            minlength: 5,
            unique: true,
        },
        password: {
            type: String,
            maxlength: 8,
            minlength: 100,
        },
        googleId: {
            type: String,
        },
    },
    { timestamps: true }
);

userSchema.methods.generateJWT = function () {
    const token = jwt.sign(
        {
            _id: this.id,
            email: this.email,
            name: this.name,
        },
        process.env.JWT_SECRET_KEY,
        { expiresIn: "24d" }
    );
    return token;
};

module.exports.User = model("User", userSchema);
