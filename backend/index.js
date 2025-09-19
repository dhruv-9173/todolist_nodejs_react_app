const express = require("express");
const app = express();
const PORT = 3000;

const cors = require("cors");
const connectdb = require("./config/dbhandler");

const userRoutes = require("./Routes/userRoutes");
const taskRoutes = require("./Routes/taskRoutes");
const checkAuth = require("./Middlewares/auth");
connectdb("mongodb://127.0.0.1:27017/TODOLIST");

app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/user", userRoutes);

app.use("/task", checkAuth, taskRoutes);

app.listen(PORT, () => {
  console.log("Server Started at Port:", PORT);
});
