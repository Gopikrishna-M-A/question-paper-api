import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  phone: {
    type: String,
  },
  subjects: {
    type: Map,
    of: String // Specify the value type
  }
});

userSchema.methods.isValidPassword = async function (password) {
    try {
      return await bcrypt.compare(password, this.password);
    } catch (error) {
      throw new Error(error);
    }
  };

const User = mongoose.model('User', userSchema);

export default User;
