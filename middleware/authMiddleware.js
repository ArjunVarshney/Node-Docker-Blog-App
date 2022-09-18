const protect = (req, res, next) => {
  const { username } = req.session;
  if (!username) {
    return res.status(401).json({
      status: "fail",
      message: "unauthorized",
    });
  }
  next();
};
module.exports = protect;
