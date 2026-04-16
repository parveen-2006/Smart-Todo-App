const mongoose = require("mongoose");

main()
  .then(() => {
    console.log("db connected");
  })
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/SmartTodo");
}

const UserSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true 
    ``
  },
);

let User = mongoose.model("User" , UserSchema);

module.exports = User;