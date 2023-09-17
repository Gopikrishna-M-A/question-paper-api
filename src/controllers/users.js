import passport from 'passport';
import bcrypt from 'bcrypt';
import User from '../models/userModel.js'




export const signup = async (req, res) => {
    try {
      const { values, subjects } = req.body;
      const { username, email, password, phone } = values;
      const lowercaseUsername = username.toLowerCase();
  
      // Check if the username or email already exists
      const existingUser = await User.findOne({ $or: [{ username:lowercaseUsername }, { email }] });
      if (existingUser) {
        return res.status(400).json({ error: 'Username or email already exists' });
      }
  
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Create a new user
      const newUser = new User({
        username:lowercaseUsername,
        email,
        password: hashedPassword,
        phone,
        subjects
      });
  
      // Save the new user to the database
      await newUser.save();
  
      res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred' });
    }
  };


  export const login = (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.status(401).json({ error: info.message });
      }
      req.logIn(user, (err) => {
        if (err) {
          return next(err);
        }
        return res.status(200).json({ message: 'Login successful' });
      });
    })(req, res, next);
  } 


export const logout = (req, res) => {
  try {
    req.logout((err) => {
      if (err) {
        res.status(500).json({ error: 'An error occurred during logout' });
      }
      res.status(200).json({ message: 'Logout successful' });
    });
  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).json({ error: 'An error occurred during logout' });
  }
}   


export const check =  (req, res) => {
  console.log("\n auth check :",req.session.passport);
  console.log('Received GET request with credentials');
  console.log('Request URL:', req.url);
  console.log('Request Headers:', req.headers);
  console.log('Request Cookies:', req.cookies); 

  if (req.isAuthenticated()) {
    return res.status(200).json({
      isAuthenticated: true,
      user: req.user  
    });
  } else {
    return res.status(200).json({
      isAuthenticated: false
    });
  }
}

export const addSubject = async(req,res) => {
  const { subName, subType } = req.body;
  const userId = req.user._id;

  try {
    // Find the user by their ID
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Add the new subject to the user's subjects object
    user.subjects.set(subName, subType);

    // Save the updated user
    await user.save();

    return res.status(200).json({ message: 'Subject added successfully' });
  } catch (error) {
    console.error('Error adding subject:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}