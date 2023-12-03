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
   
}