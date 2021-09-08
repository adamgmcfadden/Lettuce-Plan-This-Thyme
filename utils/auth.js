// if not logged in, redirect to login page
const withAuth = (req, res, next) => {
  if (!req.session.user_id) {
    res.redirect("/login");
  } else {
    next();
  }
};

// export authorization function
module.exports = withAuth;
