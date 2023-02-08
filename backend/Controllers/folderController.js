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

const updateFolder = async (req, res) => {
  const { folderId } = req.params;
  const { fileIds } = req.body;
  for (let file in fileIds) {
    await folderModel.findByIdAndUpdate(folderId, {
      $push: { contains: file },
    });
  }
};

const getFolderContains = async (req, res) => {
  const { folderId } = req.params;
  console.log("Request received: ", folderId);
  const response = await folderModel.findById(folderId).populate("contains");
  return res.json(response);
};

module.exports = { addFolder, updateFolder, getFolderContains };
