var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

exports.setup = function(User, config) {
    passport.use(new GoogleStrategy({
            clientID: config.google.clientID,
            clientSecret: config.google.clientSecret,
            callbackURL: config.google.callbackURL
        },
        function(accessToken, refreshToken, profile, done) {
            console.log("accessToken",accessToken);

            User.findOne({
                'google.id': profile.id
            }, function(err, user) {
                console.log("user google",user);
                if (!user) {
                    user = new User({
                        name: profile.displayName,
                        email: profile.emails[0].value,
                        role: 'user',
                        username: profile.username,
                        provider: 'google',
                        google: profile._json
                    });
                    user.save(function(err) {
                        console.log("err save user",err);
                        if (err) return done(err);
                        done(err, user);
                    });
                } else {
                    console.log("existing user",user);
                    return done(err, user);
                }
            });
        }
    ));
};