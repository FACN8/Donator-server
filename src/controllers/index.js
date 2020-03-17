const express = require("express");
const router = express.Router();

const auth = require("./auth");
const clients = require("./clients");

const middleware = require("../middlewares");

router.post("/api/authenticate", auth.authenticate);
router.post("/api/addUser", auth.addUser);
router.post("/api/updateUser", middleware.authCheck, clients.updateUserProfile);
router.post("/api/donate", middleware.authCheck, clients.Donate);

router.get("/api/orgsImages", clients.getOrgInfo);
router.get("/api/orgInfo", middleware.authCheck, clients.getOrgInfo);
router.get("/api/userInfo", middleware.authCheck, clients.getUserInfo);
router.get("/api/UserStatistics", middleware.authCheck, clients.getUserStatistics);

module.exports = router;
