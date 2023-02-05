const mongoose = require("mongoose");

const fileSchema = new mongoose.Schema(
  {
    name: String,
    cid: String,
    size: Number,
    user: { type: mongoose.Types.ObjectId, ref: "User" },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true,
  }
);

const fileModel = mongoose.model("File", fileSchema);
module.exports = { fileModel };
