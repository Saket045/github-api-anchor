import express from "express";
import { getUserProfileAndRepos,likeProfile,getLikes } from "../controllers/user.controller.js";
import { ensureAuthenticated } from "../middleware/ensureAuthenticated.js";
const router=express.Router();

router.get('/profile/:username',getUserProfileAndRepos);
router.post('/like/:username',ensureAuthenticated,likeProfile)
router.get('/likes',ensureAuthenticated,getLikes)
export default router;