import {Router} from 'express';

export default ( ) => {
    let api = Router();
    api.get('/', function(req, res){
        try{
            res.status(200).json({health: 'UP'}); 
        } catch(e){
            console.error(e);
            res.status(500).json({health: 'DOWN'});
        }
    });
    return api;
};