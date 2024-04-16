const Team = require("../../controllers/findAll");

const getTeamHandler = async(req,res) =>{

    try{
         const teams = await Team.findAllTeams();
          res.status(200).json(teams);
    }catch(error){
        res.status(500).json({error:error.message});
    };
}


module.exports = {getTeamHandler,
};