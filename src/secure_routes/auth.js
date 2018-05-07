
const ensureAuthenticated = function(req,res, next) {
    if (req !== undefined && req !== null && req.isAuthenticated()) {
        return next(null);
    }
    if( res !== null && res !== undefined )
        res.redirect('/v1/login')
}
module.exports = ensureAuthenticated; 