const axios = require('axios').default;

class QrController {
  static showQr(req, res, next) {
    const { title, description, status, due_date } = req.body;
    const message = `Do this!%0D%0ATitle: ${title}%0D%0ADescription: ${description}%0D%0AStatus: ${status}%0D%0ADue Date: ${due_date}`;

    axios.get(`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${message}`)
    .then(function (response) {
      res.status(200).json({url: response.config.url});
    })
    .catch(function (error) {
      next();
      console.log(error);
    })
    .then(function () {
      // always executed
    });
  }
}

module.exports = QrController;