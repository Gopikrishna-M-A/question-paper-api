import express from 'express';
import Question from '../models/questionModel.js'


export const getQuestion = async (req, res) => {
    const questionId = req.params.id;
    try {
      const question = await Question.findById(questionId);
  
      if (!question) {
        return res.status(404).json({ message: "Question not found" });
      }
  
      res.status(200).json(question);
    } catch (error) {
      console.error('Error fetching question by ID:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
}   



export const getAllQuestions = async (req, res) => {
    try {
        const questions = await Question.find({ })
        res.status(200).json(questions)
      } catch (error) {
        console.error('Error fetching questions by subject:', error)
        res.status(500).json({ error: 'Internal server error' })
      }
}   



export const getQuestionsBySubject = async (req, res) => {
    const subject = req.params.subject
    try {
      const questions = await Question.find({ subject })
      res.status(200).json(questions)
    } catch (error) {
      console.error('Error fetching questions by subject:', error)
      res.status(500).json({ error: 'Internal server error' })
    }
}   



export const addQuestion = async (req, res) => {
    try {
        const {
          question,
          Dlevel,
          Clevel,
          section,
          mark,
          subject,
          image,
          tableData,
          row,
          col,
          opta,
          optb,
          optc,
          optd,
          space
        } = req.body



        let imageSrc
        // Access the uploaded image file
        if(req.file){
           imageSrc = req.file.path
        }else{
           imageSrc = "null"
        }

        const dataToSave = {
          question,
          Dlevel,
          Clevel,
          section,
          mark,
          subject,
          imageSrc,
          tableData,
          row,
          col,
          opta,
          optb,
          optc,
          optd,
          space
        }


        const filteredData = {};
        for (const key in dataToSave) {
          const value = dataToSave[key];

          // Convert string "undefined" to undefined
          if (value === "undefined") {
            continue;
          }

          // Convert string "null" to null
          if (value === "null") {
            filteredData[key] = null;
            continue;
          }

          // Convert valid numerical strings to numbers
          if (!isNaN(value)) {
            filteredData[key] = Number(value);
            continue;
          }

          // Include other non-null and non-undefined values as they are
          if (value !== null && value !== undefined) {
            filteredData[key] = value;
          }
        }



        const newQuestion = new Question(filteredData)
        const savedQuestion = await newQuestion.save();
        res.status(201).json(savedQuestion);
      } catch (error) {
        console.error('Error adding question:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
}   



export const deleteQuestion = async (req, res) => {
    const questionId = req.params.id;
    try {
      // Find the question by its ID and delete it
      const deletedQuestion = await Question.findByIdAndDelete(questionId);
  
      if (!deletedQuestion) {
        return res.status(404).json({ message: "Question not found" });
      }
  
      res.status(200).json({ message: "Question deleted successfully" });
    } catch (error) {
      console.error('Error deleting question:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
}   



export const updateQuestion = async (req, res) => {
    const questionId = req.params.id;
    const updates = req.body;
    try {
      // Find the question by its ID and update the specified fields
      const updatedQuestion = await Question.findByIdAndUpdate(questionId, updates, { new: true });
  
      if (!updatedQuestion) {
        return res.status(404).json({ message: "Question not found" });
      }
  
      res.status(200).json(updatedQuestion);
    } catch (error) {
      console.error('Error updating question:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
}   