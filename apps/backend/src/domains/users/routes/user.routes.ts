import express from 'express';
import {createUser, getAllUsers} from "../controllers/user.controller";

const router = express.Router();

router.get('/get-all-users', getAllUsers);
router.post('/create-user', createUser);

export default router;