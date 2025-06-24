import express from "express";
import {
  getAllLeads,
  getLeadById,
  updateLead,
  deleteLead,
  createLead,
} from "../Controllers/leadController.js";

const router = express.Router();

router.post("/", createLead);

// GET /api/admin/leads/
router.get("/getall", getAllLeads);

// GET /api/admin/leads/:id
router.get("/:id", getLeadById);

// PUT /api/admin/leads/:id
router.put("/:id", updateLead);

// DELETE /api/admin/leads/:id
router.delete("/:id", deleteLead);

export default router;
