import custErr from '../shared/model/error';

const ensureAuthenticated = function(req,res, next) {
    if (req !== undefined && req !== null && req.isAuthenticated()) {
        return next(null);
    }
    if( res !== null && res !== undefined ){
        res.status(403);
        res.json(custErr(403,'Only signed in users are authorized to access resourced'));
    }
}
module.exports = ensureAuthenticated; 