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

        const page = parseInt(req.query.page) || 0
        const limit = parseInt(req.query.limit) || 20
        const skip = page * limit

        const result = await Users.find().skip(skip).limit(limit)
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

const countAllUser = async (req, res) => {
    try {
        const countUser = await Users.estimatedDocumentCount().exec();
        console.log('here is count', countUser);
        res.status(200).json({
            countUser
        });
    } catch (error) {
        res.status(500).json({
            error
        });
    }
};

// delete a User 

const deleteUser = async(req,res)=> {
    try {
        const   userId = req.params.id 
        const deletedUser = await Users.findOneAndDelete({_id : userId})
 
        if (deletedUser) {
            res.status(200).json({ message: 'User deleted successfully', user: deletedUser });
          } else {
            res.status(404).json({ message: 'User not found' });
          }
 
    } catch (error) {
        console.error(error);
    res.status(500).json({ error: 'Internal server error' })
    }
}


// here is update user  functionality

const updateUser = async(req,res)=> {
    try {
        const userId = req.params.id 
        const updatedUserData = req.body
        const updatedUser = await Users.findOneAndUpdate({_id : userId},updatedUserData,{new : true})

        if (updatedUser) {
            res.status(200).json({ message: 'User updated successfully', user: updatedUser });
          } else {
            res.status(404).json({ message: 'User not found' });
          }
    } catch (error) {
        console.error(error);
    res.status(500).json({ error: 'Internal server error' });
    }
}



const userSearchByName = async(req,res)=> {
    try {
        const { name } = req.params;

        if (!name) {
            return res.status(400).json({ error: "Name parameter is required for search." });
        }

        const result = await Users.find({
            $or: [
                { first_name: { $regex: new RegExp(name, "i") } },
                { last_name: { $regex: new RegExp(name, "i") } }
            ]
        });

        res.status(200).json({ result });
    } catch (error) {
        res.status(500).json({ error });
    }
}


const filterUser = async(req,res)=> {

    try {
        const domain = req.params.domain;
    
        
        const result = await Users.find({ domain: domain });
    
        // Check if there are users with the specified domain
        if (result.length > 0) {
          res.json({ success: true, data: result });
        } else {
          res.json({ success: false, message: 'No users found with the specified domain.' });
        }
      } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
      }

}






module.exports = {
    createUser,
    getAllUser,
    countAllUser,
    userSearchByName,
    filterUser,
    deleteUser,
    updateUser
   
}