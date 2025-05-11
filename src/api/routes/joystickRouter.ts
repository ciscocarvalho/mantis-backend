import { Router } from "express";
import { getJoystickInfo, setJoystickInfo } from "../../data/joystick";
import { UNKNOWN_ERROR } from "../errors";

const router = Router();

router.get("/", async (req, res) => {
  try {
    res.status(200).json({ data: getJoystickInfo() });
  } catch (e) {
    console.error(e);
    res.status(404).json({ errors: [UNKNOWN_ERROR] });
  }
});

router.post("/", async (req, res) => {
  try {
    const { x, y, direction } = req.body;

    setJoystickInfo({ x, y, direction });
    req.socket.emit(`joystick:update`, { x, y, direction });
    console.log("joystick:update");
    console.log({ x, y, direction });
    res.status(200).json({ data: { x, y, direction } });
  } catch (e) {
    console.error(e);
    res.status(404).json({ errors: [UNKNOWN_ERROR] });
  }
});

export default router;
