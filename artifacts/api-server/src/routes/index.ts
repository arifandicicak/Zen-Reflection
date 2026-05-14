import { Router, type IRouter } from "express";
import healthRouter from "./health";
import zenRouter from "./zen";

const router: IRouter = Router();

router.use(healthRouter);
router.use(zenRouter);

export default router;
