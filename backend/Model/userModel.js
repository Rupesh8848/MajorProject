const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    userMetaMaskId: {
      type: String,
      require: true,
    },
    rootDirectory: {
      type: [mongoose.Types.ObjectId],
      ref: "File",
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
