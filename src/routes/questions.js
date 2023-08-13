import express from 'express';
import multer from 'multer'
const router = express.Router();
import { getQuestion, getAllQuestions, getQuestionsBySubject, addQuestion, deleteQuestion, updateQuestion }  from '../controllers/questions.js';


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '../uploads') // Specify the directory where files will be stored
    },
    filename: function (req, file, cb) {
        return cb(null, `${Date.now()}-${file.originalname}`);
    }
  });

const upload = multer({ storage: storage });

router.get("/:id", getQuestion);
router.get("/", getAllQuestions);
router.get("/subject/:subject", getQuestionsBySubject);
router.post("/", upload.single('image'), addQuestion);
router.delete("/:id", deleteQuestion);
router.patch("/:id", updateQuestion);



export default router;
