function validateTask(req, res, next) {
  if (typeof req.body.title !== 'string' || !req.body.title.trim()) {
    return res.status(400).json({
      success: false,
      message: 'Title is required'
    });
  }

  const title = req.body.title.trim().replace(/\s+/g, ' ');

  if (title.length > 100) {
    return res.status(400).json({
      success: false,
      message: 'Title must be 100 characters or fewer'
    });
  }

  req.body.title = title;
  next();
}

module.exports = { validateTask };
