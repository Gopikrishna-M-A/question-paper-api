import express from 'express';
const router = express.Router();
import { login, signup, logout, check, addSubject }  from '../controllers/users.js';




router.post("/login", login)
router.post("/signup", signup)
router.post("/logout", logout)
router.post("/add-subject", addSubject)
router.get("/check-auth", check)
  




export default router;
