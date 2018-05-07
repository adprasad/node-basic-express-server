import Router from 'express';

export default (passport) => {
    let api = Router({mergeParams: true});
    console.info("passport:");
    console.info(passport);
    api.get('/',
        passport.authenticate('google', {
            scope: ['openid','email','profile']
        }), 
        function(req, res){
            console.info("According to documentations we should never get into this function.");
            res.json({google: true})
        });

    api.get('/callback',
        passport.authenticate('google', {
            failureRedirect: '/v1/health'
        }),
        function (req, res) {
            console.info(req);
            res.json(req.user);
        });
    return api;
};