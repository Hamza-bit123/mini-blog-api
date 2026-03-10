const fs = require("fs");

const validator = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);

    if (error) {
      const image = req.file;
      if (image) {
        fs.unlink(image.path, (err) => {
          if (err) console.log({ error: err.message });
        });
      }
      return res
        .status(400)
        .json({ success: false, error: error.details[0].message });
    }

    next();
  };
};

module.exports = validator;
