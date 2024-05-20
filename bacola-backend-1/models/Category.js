import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            require: true
        },
        images: [
            {
                type: String,
                require: true
            }
        ],
        color: {
            type: String,
            require: true
        },

    },
    { timestamps: true }
);
export default mongoose.model("category", categorySchema);
