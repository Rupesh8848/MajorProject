const { folderModel } = require("../Model/folderModel");
const { userModel } = require("../Model/userModel");

const addFolder = async (req, res) => {
  const { name, responseObsArray, user } = req.body;

  try {
    const folder = await folderModel.create({
      name,
      user,
    });

    await userModel.findByIdAndUpdate(
      user,
      {
        $push: { folders: folder._id },
      },
      { new: true, upsert: true }
    );
    return res.json(folder);
  } catch (error) {
    return res.json({ message: "Error Adding Folder", error });
  }
};

const nestedFolder = async (req, res) => {
  const { parentFolder } = req.params;
  console.log("Req inside nested folder");
  console.log(`Parent Folder: ${parentFolder}`);
  const { name, user } = req.body;
  try {
    const folder = await folderModel.create({
      name,
      user,
    });

    await folderModel.findByIdAndUpdate(
      parentFolder,
      {
        $push: { folders: folder._id },
      },
      { new: true, upsert: true }
    );
    return res.json(folder);
  } catch (error) {
    return res.json({ message: "Error Adding Folder", error });
  }
};

const getFolderContains = async (req, res) => {
  const { folderId } = req.params;
  console.log("Request received: ", folderId);
  const response = await folderModel
    .findById(folderId)
    .populate("contains")
    .populate("folders");
  return res.json(response);
};

module.exports = {
  addFolder,
  // updateFolder,
  getFolderContains,
  nestedFolder,
  // addFileToFolder,
};
