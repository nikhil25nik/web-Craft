import express from "express"
import { isAuth } from "../middleware/isAuth.js"
import { billing } from "../controller/payment.controller.js";

const paymentRouter = express.Router()

paymentRouter.post("/",isAuth,billing)

export default paymentRouter;