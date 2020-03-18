const { user_model, org_model } = require("../models");

exports.getOrgInfo = async (req, res) => {
  try {
    const orgInfo = await org_model.getOrganizations();
    res.send({ orgInfo });
  } catch (error) {
    res.send({ error });
  }
};

exports.getUserInfo = async (req, res) => {
  try {
    const [userInfo] = await user_model.findByUsername(res.locals.user);
    res.send({ userInfo });
  } catch (error) {
    res.send({ error });
  }
};
exports.getUserStatistics = async (req, res) => {
  try {
    let orgDonations = [];
    let totalCount = 0;
    const userDonations = await user_model.getUserDonations(res.locals.userId);
    try {
      await userDonations.map(async donationInfo => {
        const orgName = await org_model.findOrganizationName(
          donationInfo.org_id
        );
        orgDonations.push({
          org_name: orgName[0],
          donationCount: donationInfo.count
        });
        totalCount += donationInfo.count;
      });
    } catch (err) {}//the userDonations is empty so this why it will be skiped

    const donations = {
      totalDonations: totalCount ? totalCount : 0,
      orgDonations
    };
    res.send({ donations });
  } catch (error) {
    console.log(error);
    res.send({ error });
  }
};

exports.Donate = async (req, res) => {
  const { org_id, donation_type, donation_info, delivery_time } = req.body;

  try {
    await user_model.addDonation(
      res.locals.id,
      org_id,
      donation_type,
      donation_info,
      delivery_time
    );
    res.send({ redirect: "/OrgInfo", message: "Thank you for your donation" });
  } catch (error) {
    res.send({ error });
  }
};

exports.updateUserProfile = async (req, res) => {
  const { full_name, password, address, city, phone_number } = req.body;
  try {
    await user_model.updateUser(
      full_name,
      password,
      address,
      city,
      phone_number,
      res.locals.userId
    );
    res.send({ message: "Your profile has been successfully update" });
  } catch (error) {
    res.send({ error });
  }
};
