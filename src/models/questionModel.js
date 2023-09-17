import mongoose from 'mongoose';

const questionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  question: {
    type: String,
    default: null   
  },     
  Dlevel: {
    type: String,
    default: null   
  },       
  Clevel: {
    type: String,
    default: null   
  },      
  section: {
    type: String,
    default: null   
  },      
  mark: {
    type: Number,
    default: null
  },  
  subject:{
    type: String,
    default: null   
  },
  imageSrc: {
    type: String,
    default: null   
  },
  tableData: {
    type: mongoose.Schema.Types.Mixed,
    default: null       
  },
  row: {
    type: Number,
    default: null       
  },
  col: {
    type: Number,
    default: null       
  },
  opta: {
    type: String,
    default: null      
  },
  optb: {
    type: String,
    default: null      
  },
  optc: {
    type: String,
    default: null      
  },
  optd: {
    type: String,
    default: null      
  },
  space: {
    type: Number,
    default: null       
  }      
});

questionSchema.set('timestamps', true); 

const Question = new mongoose.model('Question', questionSchema);

export default Question
