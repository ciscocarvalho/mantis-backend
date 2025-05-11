import { Router } from "express";
import ledRouter from "./ledRouter";
import joystickRouter from "./joystickRouter";

const router = Router();

router.use("/led", ledRouter);
router.use("/joystick", joystickRouter);

export default router;
