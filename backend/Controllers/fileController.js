const { fileModel } = require("../Model/fileModel");
const { folderModel } = require("../Model/folderModel");
const { userModel } = require("../Model/userModel");

const postFile = async (req, res) => {
  const { name, cid, size, user, containingFolder } = req.body;
  try {
    const file = await fileModel.create({
      name,
      cid,
      size,
      user,
      containingFolder: containingFolder ? containingFolder : null,
    });

    if (!containingFolder) {
      await userModel.findByIdAndUpdate(
        user,
        {
          $push: { files: file._id },
        },
        { new: true, upsert: true }
      );
    } else {
      await folderModel.findByIdAndUpdate(
        containingFolder,
        {
          $push: { contains: file._id },
        },
        { new: true, upsert: true }
      );
    }

    return res.json("File Added");
  } catch (error) {
    return res.json("Error adding file.", error);
  }
};

const deleteFile = async (req, res) => {
  const { id } = req.params;
  console.log("Delete Request with id: ", id);
  try {
    const file = await fileModel.findByIdAndDelete(id);
    return res.json("Delete Successful.");
  } catch (error) {
    return res.json({ message: "Error Deleting File", error });
  }
};

module.exports = { postFile, deleteFile };
