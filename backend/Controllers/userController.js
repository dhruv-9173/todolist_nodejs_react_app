const { createToken } = require("../Service/authService");
const { addUser, exists, validateUser } = require("../Service/userService");

const handleRegister = async (req, res) => {
  const user = req.body;
  try {
    if (!user.email || !user.password || !user.name) {
      return res.status(200).json({ message: "All fields required" });
    }
    if (exists(user.email) > 0)
      return res.status(409).json({ message: "Email already exits" });
    await addUser(user)
      .then(() => {
        return res
          .status(201)
          .json({ message: "User Successfully Registered" });
      })
      .catch((err) => {
        return res.status(400).json({ error: err });
      });
  } catch (err) {
    return res.status(500).json({ error: err });
  }
};

const handleLogin = async (req, res) => {
  const user = req.body;
  console.log("Login Request :", user);
  try {
    if (!user.email || !user.password)
      return res.status(400).json("All fields required");
    await validateUser(user).then((value) => {
      return value === 1
        ? res.status(200).json({ token: createToken(user) })
        : res.status(400).json({ message: "Invalid Credentials" });
    });
  } catch (err) {
    return res.status(500).json({ error: err });
  }
};

module.exports = {
  handleLogin,
  handleRegister,
};
