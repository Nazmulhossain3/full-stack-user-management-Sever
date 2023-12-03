const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    first_name : {
        type : String,
        require : true
    },
    last_name :  {
        type : String,
        require : true
    },
    email : {
        type : String,
        require : true,
    },
    gender : {
        type : String,
        require : true
    },
    avatar : {
        type : String,
        require : true
    },
    domain : {
        type : String,
        require : true
    },
    available : {
        type : Boolean,
        require : true
        
    }

    
})

const Teams = mongoose.model('Team', userSchema)

module.exports = {
    Teams
}