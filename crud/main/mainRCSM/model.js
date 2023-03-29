import mongoose from 'mongoose';
const {Schema} = mongoose;

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    number: {
        type: Number,
        required: true
    }
});

const user = mongoose.model("USER", userSchema, "user_tbl");
export {user}
