import Router from 'express';
import ensureAuthenticated from './auth';

export default () => {
    let api = Router({
        mergeParams: true
    });
    api.get('/',
        ensureAuthenticated,
        function (req, res) {
            console.info("According to documentations we should never get into this function.");
            if( req.user !== undefined && req.user !== null ){
                res.status(302).json(req.user);
            } else {
                res.status(404).json({});
            }
        });
    return api;
};