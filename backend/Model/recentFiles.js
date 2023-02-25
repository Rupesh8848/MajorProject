const mongoose = require("mongoose");

const recentSchema = new mongoose.Schema(
  {
    file: { type: mongoose.Types.ObjectId, ref: "File" },
    lastOpened: { type: String },
    user: { type: mongoose.Types.ObjectId, ref: "User" },
  },
  {
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
  }
);

const recentModel = mongoose.model("Recent", recentSchema);
module.exports = { recentModel };
