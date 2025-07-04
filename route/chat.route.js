import express from "express";
import { handleChat } from "../controller/chatController.js";

const router = express.Router();

// POST /chat
router.post("/", handleChat);

export default router;
