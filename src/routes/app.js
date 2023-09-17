import express from 'express';
import questionRoutes from './routes/questions.js'; // Adjust the path as needed
import config from './config.js';
import bodyParser from 'body-parser';
import cors from 'cors';


const app = express();

const corsOptions = {
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  preflightContinue: false,
  optionsSuccessStatus: 204,
};

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors(corsOptions));
app.use('/questions', questionRoutes);

// ... other configurations ...

const PORT = process.env.PORT || 4000;

app.listen(PORT, (err) => {
  if (err) {
    console.error('Error starting the server:', err);
  } else {
    console.log(`Server started on port ${PORT}`);
  }
});
