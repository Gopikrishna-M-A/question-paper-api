import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import User from './models/userModel.js'


passport.use(
  new LocalStrategy(async (username, password, done) => {
    console.log("\n username, password:",username,password);

    const enteredUsername = username.toLowerCase();
    console.log("enteredUsername",enteredUsername);
    try {
      const user = await User.findOne({ username:enteredUsername });

      if (!user) {
        return done(null, false, { message: 'Incorrect username' });
      }

      const passwordMatch = await user.isValidPassword(password);
      if (!passwordMatch) {
        return done(null, false, { message: 'Incorrect password' });
      }
      return done(null, user);
    } catch (error) {

      return done(error);
    }
  })
);

passport.serializeUser((user, done) => {
  console.log("\n serializeUser:",user);
  done(null, user.id);
});

passport.deserializeUser( async(id, done) => {
  try {
    const user = await User.findById(id);
    if (!user) {
      return done(null, false);
    }
    done(null, user);
  } catch (error) {
    done(error);
  }
});


