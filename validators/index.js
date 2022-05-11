exports.createPostValidator = (req, res, next) => {
  req.check("title", "Write a title").notEmpty();
  req.check("title", "Title must be between 4 - 150 characters").isLength({
    min: 4,
    max: 150,
  });

  req.check("body", "Create some content").notEmpty();
  req
    .check(
      "body",
      "Content must be at least four characters long with a maximum length of 2,000 characters"
    )
    .isLength({
      min: 4,
      max: 2000,
    });
  const errors = req.validationErrors();
  if (errors) {
    const firstError = errors.map((error) => error.msg)[0];
    return res.status(400).json({ error: firstError });
  }
  next();
};

exports.userSignupValidator = (req, res, next) => {
  req.check("name", "Name is required").notEmpty();
  req
    .check("email", "Email must be between 3 - 32 characters long")
    .matches(/.+\@.+\..+/)
    .withMessage("Email must contain @")
    .isLength({
      min: 4,
      max: 32,
    });

  req.check("password", "Password is required").notEmpty();
  req
    .check("password")
    .isLength({ min: 6 })
    .withMessage("Password must contain at least six characters")
    .matches(/\d/)
    .withMessage(`Password must contain at least one digit (0 - 9)`);

  const errors = req.validationErrors();
  if (errors) {
    const firstError = errors.map((error) => error.msg)[0];
    return res.status(400).json({ error: firstError });
  }
  next();
};
