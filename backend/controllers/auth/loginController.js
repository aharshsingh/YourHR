const customErrorHandler = require('../../customErrorHandler/customErrorHandler')
const bcrypt = require('bcrypt');
const JwtService = require('../../services/JWTService');
const YourHRUser = require('../../models/YourHRUser');
const yourHRjwt = require('../../models/YourHRJWT');
const { loginSchema } = require('../../services/validator');
const loginController = {
    async login(req,res,next){
        const { error } = loginSchema.validate(req.body);
        if(error){
            return next(error);
        }
        try {
            const user = await YourHRUser.findOne({ email: req.body.email });
            if(!user)
                return next(customErrorHandler.wrongCredentials('Username or password is wrong'))
            const match = await bcrypt.compare(req.body.password, user.password)
            if(!match){
                return next(customErrorHandler.wrongCredentials('Username or password is wrong'))
            }

            const token = JwtService.sign({ _id: user._id });
            const access_token = new yourHRjwt({ token });
            await access_token.save();
            res.json(access_token);
        } catch (err) {
            return next(err);
        }
    },

    async verify(req,res,next){
        const { error } = tokenSchema.validate(req.body);
        if (error){
            return next(error);
        }

        let accessToken;
        let userId;
        try{
        accessToken = await yourHRjwt.findOne({ token: req.body.jwtToken });
            if(!accessToken){
                return next(customErrorHandler.notAuthorized('Invaild access token'));
            }

            try {
                const { _id } = JwtService.verify(accessToken.token)
                userId = _id;
            } catch (error) {
                return next(customErrorHandler.notAuthorized('Invaild access token'));
            }

            const user = YourHRUser.findOne({_id: userId});
            if(!user){
                return next(customErrorHandler.notAuthorized('No user found!'));
            }
        }
        catch(err){
            return next(new Error('Something went, ' + err.message));
        }
        res.send('Successfully logged in.');
    }
}

module.exports = loginController;