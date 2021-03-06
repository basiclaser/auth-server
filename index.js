const express = require("express");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const cors = require("cors");
const { connectDB } = require("./models");
const {
  createUser,
  getUser,
  loginUser,
  logoutUser,
} = require("./controllers/user");

const app = express();
const { PORT = 4000 } = process.env;

app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(express.json());
app.use(cookieParser());
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
  })
);

app.use((err, req, res, next) => {
  res.status(err.status).send(err);
});

app.get("/", (req, res) => {
  console.log(req.sessionID);
  req.session.requestCount = req.session.requestCount
    ? req.session.requestCount + 1
    : 1;
  res.send(req.session);
});
app.post("/register", createUser);
app.post("/login", loginUser);
app.get("/logout", logoutUser);
app.get("/profile", getUser);

(async function () {
  await connectDB();
  app.listen(PORT, () =>
    console.log("GO GO GO GO GO http://localhost:" + PORT)
  );
})();
