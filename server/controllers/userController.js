const { User } = require('../models');
const jwt = require('../helper/jwt');
const compareSync = require('../helper/compareBcrypt');

class UserController {
	static register(req, res) {
		const { name, email, password } = req.body;

		User.create({
			name,
			email,
			password
		})
			.then((user) => {
				console.log(user);
				res.status(201).json({
					User: user
				});
			})
			.catch((err) => {
				 let arr = []
				 console.log(err)
				 for(let i = 0; i < err.errors.length; i++){
				   arr.push(err.errors[i].message)
				 }
				 if(arr.length > 0){
				   res.status(400).json({
				     error: arr.join(',')
				   })
				 }else{
				   res.status(500).json({
				     error: err
				   })
				 }
				// next(err);
			});
	}

	static logIn(req, res, next) {
		const { email, password } = req.body;

		User.findOne({
			where: {
				email
			}
		})
			.then((user) => {
				if (!user || !compareSync(password, user.password)) {
					// res.status(400).json({
					//   error: 'Invalid pasword/email'
					// })
					next({ name: 'SequelizeValidationError' });
				} else {
					const access_token = jwt(user);
					res.status(200).json({
						access_token
					});
				}
			})
			.catch((err) => {
				//  console.log(err)

				//     res.status(500).json({
				//       error: err
				//     })
				next(err);
			});
	}
}

module.exports = UserController;
