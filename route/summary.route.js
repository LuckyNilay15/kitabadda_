import express from "express";
import { saveSummary, getSummaries,deleteSummary } from "../controller/summaryController.js";

const router = express.Router();

router.post("/", saveSummary);
router.get("/", getSummaries);
router.delete("/:id", deleteSummary);


export default router;
