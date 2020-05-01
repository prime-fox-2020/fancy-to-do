const { User } = require('../models');
const jwt = require('../helper/jwt');
const compareSync = require('../helper/compareBcrypt');
const {OAuth2Client} = require('google-auth-library');
const CLIENT_ID = "706011335996-c7necglhn9o63odfso5n0ma9b6me94cg.apps.googleusercontent.com"
const client = new OAuth2Client(CLIENT_ID);

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
				 next(err)
			
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
					next({ name: 'Login Error' });
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

	static google_sign_in(req,res,next){
		let currentEmail = ''
		console.log('google sign-in')
		const token = req.body.id_token
		
  client.verifyIdToken({
      idToken: token,
      audience: CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
      // Or, if multiple clients access the backend:
      //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
	})
	.then(ticket=>{
		// const payload = ticket.getPayload();
		
		 currentEmail = ticket.getPayload().email
		console.log(currentEmail)
		// console.log(payload)
		return User.findOne({
			where:{email: currentEmail}
		})
	})
	.then(user=>{
		
		if(user){
			
			console.log(user)
			let access_token = jwt(user)
			res.status(200).json({access_token})
		}else{
			console.log(currentEmail, 'ini else')
			return User.create({
				email: currentEmail,
        password: 'random'
			})
		
		}
	})
	.then(newUser=>{
		// console.log('woiiii ini', newUser)
      
		const access_token = jwt(newUser) 
		res.status(200).json({access_token})
		console.log('emailllllllllllll',currentEmail)
	})
	.catch(err=>{
		console.log(err,'--------------------------------------------')
	})
	}
}

module.exports = UserController;

// async function verify() {
//   const ticket = await client.verifyIdToken({
//       idToken: token,
//       audience: CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
//       // Or, if multiple clients access the backend:
//       //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
//   });
//   const payload = ticket.getPayload();
//   const userid = payload['sub'];
//   // If request specified a G Suite domain:
//   //const domain = payload['hd'];
// }
// verify().catch(console.error);
