const { user_model, org_model } = require("../models");

exports.getOrgInfo = async (req, res, err) => {
  if (err) res.end({ error: "There is a Problem with the server" });

  try {
    const orgInfo = await org_model.getOrganizations();
    res.end({ orgInfo });
  } catch (error) {
    res.end({ error });
  }
};

exports.getUserInfo = async (req, res, err) => {
  if (err) res.end({ error: "There is a Problem with the server" });

  try {
    const userInfo = await user_model.findByUsername(res.locals.user);
    res.end({ userInfo });
  } catch (error) {
    res.end({ error });
  }
};
exports.getUserStatistics = async (req, res, err) => {
  if (err) res.end({ error: "There is a Problem with the server" });

  try {
    let orgDonations = [];
    const userDonations = await user_model.getUserDonations(res.locals.id);
    await userDonations.map(async donationInfo => {
      const orgName = await org_model.findOrganizationName(donationInfo.org_id);
      orgDonations.push({
        org_name: orgName[0],
        donationCount: donationInfo.count
      });
    });
    const Donations = {
      totalDonations: userDonations.length,
      orgDonations
    };
    res.end({ Donations });
  } catch (error) {
    res.end({ error });
  }
};

exports.Donate = async (req, res, err) => {
  if (err) res.end({ error: "There is a Problem with the server" });

  const { org_id, donation_type, donation_info, delivery_time } = req.body;

  try {
    await user_model.addDonation(
      res.locals.id,
      org_id,
      donation_type,
      donation_info,
      delivery_time
    );
    res.end({ redirect: "/OrgInfo", message: "Thank you for your donation" });
  } catch (error) {
    res.end({ error });
  }
};

exports.updateUserProfile = async (req, res, err) => {
  if (err) res.end({ error: "There is a Problem with the server" });

  const { fullName, password, address, city, phoneNumber } = req.body;

  try {
    await user_model.updateUser(
      fullName,
      password,
      address,
      city,
      phoneNumber,
      res.locals.id
    );
    res.end({ message: "Your profile has been successfully update" });
  } catch (error) {
    res.end({ error });
  }
};
