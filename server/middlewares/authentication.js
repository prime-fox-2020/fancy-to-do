const SECRETKEY = process.env.SECRETKEY;
const jwt = require('jsonwebtoken');

const authentication = (req, res, next) => {
	const { access_token } = req.headers;

	if (!access_token) {
		// res.status(404).json({
		// 	error: 'User not found'
		// });
		next({name: 'DATA_NOT_FOUND'})
	}

	try {
		const decoded = jwt.verify(access_token, SECRETKEY);
		console.log(decoded);
		req.userData = decoded;

		next();
	} catch (err) {
		// res.status(401).json({
		// 	error: 'User not authenticated'
		// });
		next(err)
	}
};

module.exports = authentication