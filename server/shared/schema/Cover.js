const mongoose = require("mongoose");

const CoverSchema = mongoose.Schema(
    {
        name: {
            type: String
        },
        buffer: {
            type: Buffer
        },
        mimetype: {
            type: String
        },
        created_date: {
            type: Date,
            default: Date.now
        },
        updated_date: {
            type: Date,
            default: Date.now
        }
    },
    { collection: "cover" }
);

module.exports = mongoose.model("cover", CoverSchema);
