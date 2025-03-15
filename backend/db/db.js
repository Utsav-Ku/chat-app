import mongoose from "mongoose";

function connect() {
  return mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Successfully connected to the MONGODB");
  })
  .catch((err) => {
    console.log(err);
  });
}

export default connect;