const { User } = require('../models');
const jwt = require('../helper/jwt');
const compareSync = require('../helper/compareBcrypt');
const { OAuth2Client } = require('google-auth-library');
const CLIENT_ID = process.env.CLIENT_ID
const client = new OAuth2Client(CLIENT_ID);
const PASS = process.env.PASS;
class UserController {
	static register(req, res, next) {
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
				next(err);
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
					next({ name: 'Login Error' });
				} else {
					const access_token = jwt(user);
					res.status(200).json({
						access_token
					});
				}
			})
			.catch((err) => {
				next(err);
			});
	}

	static google_sign_in(req, res, next) {
		let currentEmail = '';
		console.log('google sign-in');
		const token = req.body.id_token;

		client.verifyIdToken({
				idToken: token,
				audience: CLIENT_ID
			})
			.then((ticket) => {
				currentEmail = ticket.getPayload().email;
				console.log(currentEmail);
			
				return User.findOne({
					where: { email: currentEmail }
				});
			})
			.then((user) => {
				if (user) {
					console.log(user);
					let access_token = jwt(user);
					res.status(200).json({ access_token })
					
				} else {
					console.log(currentEmail, 'ini else');
					return User.create({
						email: currentEmail,
						password: PASS
					})
					.then((newUser) => {
						const access_token = jwt(newUser);
						res.status(200).json({ access_token });
						console.log('emailllllllllllll', currentEmail);
					})
				}
			})
			
			.catch((err) => {
				next(err)
			});
	}
}

module.exports = UserController;
