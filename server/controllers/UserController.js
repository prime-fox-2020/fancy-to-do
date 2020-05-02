const { User } = require('../models')
const bcrypt = require('bcrypt')                             // jwt proced
const { generateToken } = require('../helpers/jwt')          // jwt proced

const {OAuth2Client} = require('google-auth-library');       //google proced
const CLIENT_ID = '383035084667-mgj86iu80a39a3cbgekmdlsfosphlhuc.apps.googleusercontent.com'
const client = new OAuth2Client(CLIENT_ID);                  //google proced

class UserController {

    static registerUser(req, res){
        let { email, password } = req.body;
        User.create({
            id, email, password
        })
        .then( user => {
            if (user) {
                res.status(201).json({ TodoUser: user})
            } else {
                res.status(400).json({ 
                    message: err.message || 'error - bad request'
                })
            }
        })
        .catch( err => {
            res.status(500).json({ 
                message: err.message || 'internal server error'
            })
        })

    }

    // for generate token after login (check helper)
    static loginUser(req, res){
        let { email, password } = req.body
        
        User.findOne({
            where: { email }
        })
        .then( user => {
            if (!user || !bcrypt.compareSync(password, user.password)) {
                res.status(400).json({ message: 'Invalid email / password' })
            }

            return user
        })
        .then( user => {
            const access_token = generateToken(user)
            res.status(201).json({ access_token })
        })
        .catch( err => {
            res.status(500).json({ 
                message: err.message || 'internal server error'
            })
        })

    }
    
    //GOOGLE DOCUMENTATION
    // const {OAuth2Client} = require('google-auth-library');
    // const client = new OAuth2Client(CLIENT_ID); 
    // async function verify() {
    // const ticket = await client.verifyIdToken({
    //     idToken: token,
    //     audience: CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
    //     // Or, if multiple clients access the backend:
    //     //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
    // });
    // const payload = ticket.getPayload();
    // const userid = payload['sub'];
    // // If request specified a G Suite domain:
    // //const domain = payload['hd'];
    // }
    // verify().catch(console.error);

    static googleUser(req, res) {
        const token = req.body.id_token
        let recent_email = null

        client.verifyIdToken({
            idToken: token,
            audience: CLIENT_ID
        })
        .then(ticket => {
            const payload = ticket.getPayload();
            // payload['email'];
            recent_email = payload.email;

            return User.findOne({
                where: { email: recent_email }
            })
        })
        .then( isUser => {
            //kalau isUser ada
            if (isUser) {
                const access_token = generateToken(isUser)
                res.status(200).json({ access_token })
                return
            } else { 
                //kalao isUser gakada ya create baru
                return User.create({
                    email: recent_email,
                    password: 'randomPassword'
                })
            }
        })
        .then(newUser =>{
            const access_token = generateToken(newUser)
            res.status(200).json({ access_token })
        })
        .catch(err => {
            console.log(err)
        })        
    }
}

module.exports = UserController;
