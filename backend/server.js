//Importing packages
const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const dotenv = require("dotenv").config();

const PORT = process.env.PORT || 3000;

//Routing
const loginRoutes = require("./routers/login.routes");
const registerRoutes = require("./routers/register.routes");
const userRoutes = require("./routers/user.routes");
//Middlewares

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use("/users", userRoutes);
app.use("/login", loginRoutes);
app.use("/register", registerRoutes);
app.use("/profile", loginRoutes.get);

//Starting the server

const server = http.createServer(app);
server.listen(PORT, () => console.log(`Server started at PORT ${PORT}`));
