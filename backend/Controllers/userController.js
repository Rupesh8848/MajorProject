const { userModel } = require("../Model/userModel");

const userChecker = async (req, res) => {
  const { userMetaMaskId } = req.params;
  console.log("Meta mask id: ", userMetaMaskId);
  var user = await userModel
    .findOne({ userMetaMaskId })
    .populate("rootDirectory");
  if (!user) {
    user = await userModel.create({ userMetaMaskId });
  }
  return res.json(user);
};

module.exports = { userChecker };
