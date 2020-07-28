const axios = require('axios')

class ChartController {
    static getCharts (req, res) {
        const done = req.query.yes
        const notDone = req.query.no 
        // console.log(req.query)
        axios({
            method: 'GET',
            url: `https://image-charts.com/chart?chs=700x190&chd=t:${done},${notDone}&cht=p3&chl=Done|Not-Done&chan&chf=ps0-0,lg,45,ffeb3b,0.2,f44336,1|ps0-1,lg,45,8bc34a,0.2,009688,1`,
            responseType: 'arraybuffer'
        })
        .then(data => {
            let headers = {'Content-type': 'image/gif'}
            res.writeHead(200, headers)
            res.end(data.data, 'binary')
        })
        .catch(err => {res.status(400).json(err)})
    }

    static getCats (req, res) {
        const errMsg = req.query.err
        axios({
            method: 'GET',
            url: `https://http.cat/${errMsg}`,
            responseType: 'arraybuffer'
        }).then(data => {
            let headers = {'Content-type': 'image/gif'}
            res.writeHead(200, headers)
            res.end(data.data, 'binary')
        }).catch(err => {res.status(400).json(err)})
    }
}

module.exports = ChartController