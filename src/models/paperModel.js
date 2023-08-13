import mongoose from 'mongoose';

const paperSchema = new mongoose.Schema({
  questions: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Question'
  }],
  noOfQuestions: Number
});

paperSchema.set('timestamps', true);

const Paper = new mongoose.model('Paper', paperSchema);

export default Paper;
