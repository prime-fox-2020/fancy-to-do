const TM = require('../models').Todo;
const axios = require("axios");

class TodoController {
  static add(req, res, next){ //authen
    const {title, description, status, due_date} = req.body;
    // console.log(title, description, status, due_date);
    // const { UserId } = req.userData.id;
    TM.create({title, description, status, due_date, UserId: req.userData.id})
    .then(data => {
      res.status(201).json(data);
    })
    .catch(err => {
      console.log(err);
      next(err)
    })
  }

  static show(req, res, next) { //author
    TM.findAll({where:{UserId: req.userData.id}})
      .then(data => {
        res.status(200).json(data)
      })
      .catch(err => {
        next(err)
      })
  }


  static findId(req, res, next) { //author
    TM.findByPk(Number(req.params.id))
    .then(data => {
      console.log(data);
      if (data) res.status(200).json(data);
      else  next({name: 'DATA_NOT_FOUND'})
    })
    .catch(err => {
      next(err)
    })
  }

  static update(req, res, next) { //author
    const {title, description, status, due_date} = req.body;

    TM.update({title, description, status, due_date}, {where: {id: Number(req.params.id)}})
    .then(data => {
      if (data == 1) res.status(200).json('Data succesfully updated!')
      else next({name: 'DATA_NOT_FOUND'})
    })
    .catch(err => {
        next(err)
    })
  }

  static delete(req, res, next) { // author
    TM.destroy({where:{id: req.params.id}})
    .then(data => {
      if (data == 1) res.status(200).json('Data succesfully deleted!')
      else next({name: 'DATA_NOT_FOUND'});
    })
    .catch(err => {
        next(err)
    })
  }

  static dailymail(req, res, next){
    // axios({
  //     "method":"GET",
  // "url":"https://juanroldan1989-moviequotes-v1.p.rapidapi.com/api/v1/quotes",
  // "headers":{
  // "content-type":"application/octet-stream",
  // "x-rapidapi-host":"juanroldan1989-moviequotes-v1.p.rapidapi.com",
  // "x-rapidapi-key":"c2be427676mshaa0841474a7fcd8p1d7e3ejsncf9d27c0291b",
  // "authorization":"Token token=yd8WzkWNEEzGtqMSgiZBrwtt"
  // },"params":{
  // "actor":"Al Pacino"
  // }
  // })
  //ERROR
  // DatabaseError [SequelizeDatabaseError]: column "nan" does not exist
  //   at Query.formatError (/home/zeke/Documents/phase-2/fancy-to-do/server/node_modules/sequelize/lib/dialects/postgres/query.js:366:16)
  //   at /home/zeke/Documents/phase-2/fancy-to-do/server/node_modules/sequelize/lib/dialects/postgres/query.js:72:18
  //   at tryCatcher (/home/zeke/Documents/phase-2/fancy-to-do/server/node_modules/bluebird/js/release/util.js:16:23)
  //   at Promise._settlePromiseFromHandler (/home/zeke/Documents/phase-2/fancy-to-do/server/node_modules/bluebird/js/release/promise.js:547:31)
  //   at Promise._settlePromise (/home/zeke/Documents/phase-2/fancy-to-do/server/node_modules/bluebird/js/release/promise.js:604:18)
  //   at Promise._settlePromise0 (/home/zeke/Documents/phase-2/fancy-to-do/server/node_modules/bluebird/js/release/promise.js:649:10)
  //   at Promise._settlePromises (/home/zeke/Documents/phase-2/fancy-to-do/server/node_modules/bluebird/js/release/promise.js:725:18)
  //   at _drainQueueStep (/home/zeke/Documents/phase-2/fancy-to-do/server/node_modules/bluebird/js/release/async.js:93:12)
  //   at _drainQueue (/home/zeke/Documents/phase-2/fancy-to-do/server/node_modules/bluebird/js/release/async.js:86:9)
  //   at Async._drainQueues (/home/zeke/Documents/phase-2/fancy-to-do/server/node_modules/bluebird/js/release/async.js:102:5)
  //   at Immediate.Async.drainQueues [as _onImmediate] (/home/zeke/Documents/phase-2/fancy-to-do/server/node_modules/bluebird/js/release/async.js:15:14)
  //   at processImmediate (internal/timers.js:456:21) {
  // name: 'SequelizeDatabaseError',
  // parent: error: column "nan" does not exist
  //     at Connection.parseE (/home/zeke/Documents/phase-2/fancy-to-do/server/node_modules/pg/lib/connection.js:581:48)
  //     at Connection.parseMessage (/home/zeke/Documents/phase-2/fancy-to-do/server/node_modules/pg/lib/connection.js:380:19)
  //     at Socket.<anonymous> (/home/zeke/Documents/phase-2/fancy-to-do/server/node_modules/pg/lib/connection.js:116:22)
  //     at Socket.emit (events.js:321:20)
  //     at addChunk (_stream_readable.js:297:12)
  //     at readableAddChunk (_stream_readable.js:273:9)
  //     at Socket.Readable.push (_stream_readable.js:214:10)
  //     at TCP.onStreamRead (internal/stream_base_commons.js:186:23) {
  //   name: 'error',
  //   length: 104,
  //   severity: 'ERROR',
  //   code: '42703',
  //   detail: undefined,
  //   hint: undefined,
  //   position: '138',
  //   internalPosition: undefined,
  //   internalQuery: undefined,
  //   where: undefined,
  //   schema: undefined,
  //   table: undefined,
  //   column: undefined,
  //   dataType: undefined,
  //   constraint: undefined,
  //   file: 'parse_relation.c',
  //   line: '3293',
  //   routine: 'errorMissingColumn',
  //   sql: 'SELECT "id", "title", "description", "status", "due_date", "UserId", "createdAt", "updatedAt" FROM "Todos" AS "Todo" WHERE "Todo"."id" = NaN;',
    TM.findByPk(Number(req.params.id))
    .then(data => {
      const msg = `Your due date for ${data.title} is ${data.due_date}`
      return axios({
        "method":"POST",
        "url":"https://simplemailsender.p.rapidapi.com/SendMails/Send",
        "headers":{
          "x-rapidapi-host":"simplemailsender.p.rapidapi.com",
          "x-rapidapi-key":"c2be427676mshaa0841474a7fcd8p1d7e3ejsncf9d27c0291b"
        },"data":{
          Correo_Delivery:req.userData.email,
          Mensjae:msg
        }
      })
    })
      .then(data =>{
        res.status(200).json('Mail succesfully sent!');
      })
      .catch(err=>{
        console.log(err);
        next(err);
      })
    }

}

module.exports = TodoController;
