const mongoose = require("mongoose");
const { ObjectId } = mongoose.Types;

const ReadLogSchema = mongoose.Schema(
    {
        book_name: {
            type: String
        },
        start_date: {
            type: Date
        },
        end_date: {
            type: Date
        },
        author: {
            type: String
        },
        cover: {
            type: ObjectId
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
    { collection: "read_log" }
);

module.exports = mongoose.model("read_log", ReadLogSchema);
