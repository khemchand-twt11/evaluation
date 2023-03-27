const express = require("express");
const cors = require("cors");
const { connection } = require("./configs/db");
const { userRoute } = require("./routes/user.route");
const { authMiddleware } = require("./middlewares/auth");
const { postRoute } = require("./routes/post.route");
require("dotenv").config();
const app = express();

app.use(cors());
app.use(express.json());

//ROUTES
app.use("/users", userRoute);
app.use(authMiddleware);
app.use("/posts", postRoute);
//LISTENING
app.listen(process.env.PORT, async () => {
  try {
    await connection;
    console.log("connected to db");
    console.log(`server is running at port ${process.env.PORT}`);
  } catch (error) {
    console.log(error.message);
  }
});
