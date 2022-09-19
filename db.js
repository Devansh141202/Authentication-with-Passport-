const mongoose = require("mongoose");


exports.connectMongoose = () => {
  mongoose
    .connect("mongodb+srv://20CE061:Devansh123@cluster0.hnonzla.mongodb.net/PASS?retryWrites=true&w=majority")
    .then(console.log("db connected"))
    .catch((e) => {
      console.log(e);
    });
};
