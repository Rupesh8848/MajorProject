const { recentModel } = require("../Model/recentFiles");
const addToRecent = async (req, res) => {
  const { fileId, user, date } = req.body;
  const fileExists = await recentModel.findOne({ file: fileId, user: user });
  try {
    if (!fileExists) {
      const response = await recentModel.create({
        file: fileId,
        user,
        lastOpened: date,
      });
    } else {
      await recentModel.findOneAndUpdate(
        { file: fileId, user: user },
        { lastOpened: new Date() }
      );
    }
    const data = await recentModel
      .find({ user })
      .populate("file")
      .sort("-lastOpened");
    const dataToSend = data.map((element) => {
      const { file } = element;
      return {
        ...file?._doc,
        lastOpened: element?.lastOpened,
      };
    });
    return res.json({ message: "Recent Data", dataToSend });
  } catch (error) {
    console.log("Error occured");
    console.log(error);
  }
};

const getRecent = async (req, res) => {
  const { user } = req.params;
  console.log(user);
  try {
    const data = await recentModel
      .find({ user })
      .populate("file")
      .sort("-lastOpened");
    const dataToSend = data.map((element) => {
      const { file } = element;
      return {
        ...file?._doc,
        lastOpened: element?.lastOpened,
      };
    });
    return res.json({ message: "Recent Data", dataToSend });
  } catch (error) {
    console.log("Error occured");
    console.log(error);
  }
};

const getFourRecent = async (req, res) => {
  const { user } = req.params;
  try {
    const data = await recentModel
      .find({ user })
      .populate("file")
      .sort("-lastOpened");
    console.log(data);
    const dataToSend = data.slice(0, 4).map((element) => {
      const { file } = element;
      return {
        ...file?._doc,
        lastOpened: element?.lastOpened,
      };
    });
    return res.json({ message: "Recent Data", dataToSend });
  } catch (error) {
    console.log("Error occured");
    console.log(error);
  }
};

module.exports = { addToRecent, getRecent, getFourRecent };
