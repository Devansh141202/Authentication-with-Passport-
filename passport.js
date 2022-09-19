const LocalStratagy = require("passport-local").Strategy;
const { User } = require("./db");

exports.initializingPassport = (passport) => {
  passport.use(
    new LocalStratagy(async (username, password, done) => {
      try {
        const user = User.findOne({ username });
        if (!user) return done(null, false);

        if (user.password != password) return done(null, false);

        return done(null, user);
      } catch (e) {
        return done(error, false);
      }
    })
  );
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  passport.deserializeUser(async(id, done)=>{
    try {
        const user = await User.findById(id)
        done(null, user);
    } catch (error) {
        done(error, false)
    }
  })
};
