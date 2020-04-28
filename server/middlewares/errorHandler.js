function errorHandler (err, req, res, next) {
    console.log(err);
    if (err.name == 'JsonWebTokenError') {
        res.status(401).json({
            msg: 'Tolong login dulu'
        })
    } else if (err.name == "SequelizeValidationError") {
        for (let i in err.errors) {
            if (err.errors[i].message == "Nama tidak boleh kosong") {
                res.status(400).json({
                    msg: "Nama tidak boleh kosong"
                })    
            } else if (err.errors[i].message == "Username tidak boleh kosong") {
                res.status(400).json({
                    msg: "Username tidak boleh kosong"
                })    
            } else if (err.errors[i].message == "Email tidak boleh kosong") {
                res.status(400).json({
                    msg: "Email tidak boleh kosong"
                }) 
            } else if (err.errors[i].message == "Password tidak boleh kosong") {
                res.status(400).json({
                    msg: "Password tidak boleh kosong"
                }) 
            } else if (err.errors[i].message == "Title tidak boleh kosong") {
                res.status(400).json({
                    msg: "Title tidak boleh kosong"
                }) 
            } else if (err.errors[i].message == "Description tidak boleh kosong") {
                res.status(400).json({
                    msg: "Description tidak boleh kosong"
                }) 
            } else if (err.errors[i].message == "Status tidak boleh kosong") {
                res.status(400).json({
                    msg: "Status tidak boleh kosong"
                }) 
            } else if (err.errors[i].message == "Due date tidak boleh kosong") {
                res.status(400).json({
                    msg: "Due date tidak boleh kosong"
                }) 
            } else if (err.errors[i].message == "Tanggal tidak valid!!! contoh yang benar (1999-01-01)") {
                res.status(400).json({
                    msg: "Tanggal tidak valid!!! contoh yang benar (1999-01-01)"
                }) 
            } 
        }
    } else {
        res.status(err.code || 500).json({
          err: err.msg
        })
    } 
    
    
    
    
}

module.exports = errorHandler