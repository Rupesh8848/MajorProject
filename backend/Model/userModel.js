const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    userMetaMaskId: {
      type: String,
      require: true,
    },
    files: {
      type: [mongoose.Types.ObjectId],
      ref: "File",
    },
    folders: {
      type: [mongoose.Types.ObjectId],
      ref: "Folder",
    },
  },
  {
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
    timestamps: true,
  }
);

const userModel = mongoose.model("User", userSchema);
module.exports = { userModel };
