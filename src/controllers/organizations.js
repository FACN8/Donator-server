const { findOrganizations } = require("../models/user_model.js");

exports.getOrgInfo = async (req, res, err) => {
  try {
    const orgInfo = await findOrganizations();
    res.end({ orgInfo });
  } catch (error) {
    res.end({ error });
  }
};
