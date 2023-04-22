const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = Schema({   
    name:  {
        type: String,
        required: true,
    },
    firstLastName:  {
        type: String,
        required: true,        
    },
    secondLastName:  {
        type: String,
        required: false,        
    },
    email:  {
        type: String,
        required: true,
        unique: true,        
    },
    password:  {
        type: String,
        required: true,       
    },
    role:  {
        type: String,
        required: true,        
    },
    status:  {
        type: Boolean,
        default: true,
        required: true,        
    },
    createdAt:  {
        type: Date,
        default: Date.now,        
    },
});

module.exports = mongoose.model('user', UserSchema);
