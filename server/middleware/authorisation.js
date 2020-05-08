const { ToDo } = require('../models');

function authorization(req, res, next) {
    let { id } = req.params
    console.log('id: ', req.params);
    ToDo.findByPk(id)
    .then((data) => {
        console.log('data: ', data);
        if (data) {
            if (data.UserId == req.userId) {
                next()
            } else {
                next({name: 'DATA_NOT_FOUND'})
                // res.status(404).json({msg: 'Forbidden access'})
            }       
        } else {
            next({name: 'DATA_NOT_FOUND'})
            // res.status(400).json({msg: 'Data not found'})
        }
    }).catch((err) => {
        next({name: 'EROR_SERVER'})
        // res.status(500).json({msg: 'Internal error server '})
    });
}

module.exports = {
    authorization
};
