function navbar(req, res, next) {
    res.locals.session = req.session.user;
    next();
}

module.exports = navbar;