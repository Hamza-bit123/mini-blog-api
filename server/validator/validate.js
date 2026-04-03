const fs = require("fs");

const validator = (schema) => {
  return (req, res, next) => {
    if (req.body?.tags) {
      const tags = Array.isArray(req.body.tags) ? null : [req.body.tags];
      if (tags) req.body.tags = tags;
    }
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
