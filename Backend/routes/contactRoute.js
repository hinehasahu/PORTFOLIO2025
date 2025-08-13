import express from 'express';
import { contactForm } from '../controllers/contactController.js';

export const Router = express.Router();

Router.post("/contact", contactForm)