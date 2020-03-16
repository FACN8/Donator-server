const { findOrganizations} = require("../models/user_model.js");

exports.getOrgInfo = async(req, res, err) => {
    try {
        const orgInfo= await findOrganizations();
        res.end(JSON.stringify({orgInfo}))  
    } catch (error) {
        res.end(JSON.stringify({error})) 
    }

}