const { Teams } = require("./selected.team.model");

let selectedTeamArray = [];

const createTeam = async(req,res)=> {
    try {
        const selectedUserData = req.body;
        delete selectedUserData._id;

        const teamId = req.params.id;
        const selectedTeamInstance = new Teams({ teamId, ...selectedUserData });

        // Save the instance to the database
        const result = await selectedTeamInstance.save();

        // Add the result to the array
        selectedTeamArray.push(result);

        res.status(200).json(selectedTeamArray);
    } catch (error) {
        res.status(500).json({
            error
        });
    }
}


const getTeam = async(req,res)=> {

    try {
        const result = await Teams.find()

        res.status(200).json({
            result
        })
    } catch (error) {
        res.status(500).json({
            error
        })
    }



}



module.exports = {
    createTeam,
    getTeam
}