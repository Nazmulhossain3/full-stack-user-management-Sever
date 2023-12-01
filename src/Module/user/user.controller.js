const { Users } = require("./user.model")

const createUser = async(req,res)=> {
    try {
        const newUser = new Users(req.body)
        await newUser.save()
        res.status(200).json({
            message : "user inserted successfully"
        })
    } catch (error) {
        res.status(500).json({
            error
        })
    }
}


const getAllUser = async(req,res)=> {
    try {
        const result = await Users.find()
        res.status(200).json({
            result
        })
    } catch (error) {
        res.status(500).json({
            error
        })
    }
}

// here is pagination functionality

const countUser = async(req,res)=> {

}

module.exports = {
    createUser,
    getAllUser,
    countUser
}