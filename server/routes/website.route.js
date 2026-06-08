import express from "express"
import { changes, deploy, generateWebsite, getAll, getBySlug, getWebsiteById } from "../controller/website.controller.js";
import { isAuth } from "../middleware/isAuth.js";
import { demoController } from "../controller/user.controller.js";

const websiteRouter = express.Router();

websiteRouter.post("/generate",isAuth, generateWebsite)
websiteRouter.post("/update/:id",isAuth, changes)
websiteRouter.get("/get-by-id/:id",isAuth, getWebsiteById)
websiteRouter.get("/getAll",isAuth, getAll)
websiteRouter.post("/demo",demoController)
websiteRouter.get("/deploy/:id",isAuth,deploy)
websiteRouter.get("/get-by-slug/:slug",getBySlug)

export default websiteRouter;