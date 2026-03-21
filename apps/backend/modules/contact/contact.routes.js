import express from "express";
import { submitContact, getAllContacts, deleteContact } from "./controller/contact.controller.js";

const router = express.Router();

router.post("/", submitContact);
router.get("/all", getAllContacts);
router.delete("/:id", deleteContact);

export default router;
