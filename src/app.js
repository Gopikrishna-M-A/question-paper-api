import express from 'express';
import questionRoutes from './routes/questions.js'; 
import userRoutes from './routes/users.js'
import { store } from './config.js';
import logger from 'morgan'
import bodyParser from 'body-parser';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import passport from 'passport';
import './passport-config.js';


const app = express();

const corsOptions = {
  origin: ['http://localhost:3000','https://sset.co.in'],
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  Headers: true,
  preflightContinue: false,
  optionsSuccessStatus: 204,
}; 
app.use(logger('dev'));

app.use(cors(corsOptions));
app.use(cookieParser());


app.use(session({
  secret: 'secret-key',
  resave: false,
  saveUninitialized: false,
  store: store,
  cookie: { 
      maxAge: 24 * 60 * 60 * 1000, // 1 day
      domain: '.sset.co.in',//for production
   }
}));

app.use(passport.initialize());
app.use(passport.authenticate('session'));  


app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.use('/questions', questionRoutes);
app.use('/auth', userRoutes);



const PORT = process.env.PORT || 4000;

app.listen(PORT, (err) => {
  if (err) {
    console.error('Error starting the server:', err);
  } else {
    console.log(`Server started on port ${PORT}`);
  }
});
