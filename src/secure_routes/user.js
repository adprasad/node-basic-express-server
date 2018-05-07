import Router from 'express';
import ensureAuthenticated from './auth';

export default () => {
    let api = Router({
        mergeParams: true
    });
    api.get('/',
        function (req, res) {
            console.info(req);
            res.json(req.user);
        });
    return api;
};