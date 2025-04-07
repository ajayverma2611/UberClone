const mongoose = require ('mongoose');

const blackListTokenSchema = new mongoose.Schema({
    token: {
        type : String,
        required : true,
        unique : true
    },

    createdAt: {
        type: Date,
        default: Date.now,
        expires: 60 * 60 * 24        // it is one day in seconds

    }
});


module.exports = mongoose.model('BlacklistToken',blackListTokenSchema);