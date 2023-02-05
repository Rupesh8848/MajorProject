const { fileModel } = require("../Model/fileModel");
const { userModel } = require("../Model/userModel");

const postFile = async (req, res) => {
  const { name, cid, size, user } = req.body;
  try {
    const file = await fileModel.create({
      name,
      cid,
      size,
      user,
    });

    await userModel.findByIdAndUpdate(
      user,
      {
        $push: { rootDirectory: file._id },
      },
      { new: true, upsert: true }
    );

    return res.json("File Added");
  } catch (error) {
    return res.json("Error adding file.", error);
  }
};

module.exports = { postFile };
