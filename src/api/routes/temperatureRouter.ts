import { Router } from "express";
import { getTemperature, setTemperature } from "../../data/temperature";
import { UNKNOWN_ERROR } from "../errors";

const router = Router();

router.get("/", async (req, res) => {
  try {
    res.status(200).json({ data: { temperature: getTemperature() } });
  } catch (e) {
    console.error(e);
    res.status(404).json({ errors: [UNKNOWN_ERROR] });
  }
});

router.post("/", async (req, res) => {
  try {
    const { temperature } = req.body;

    setTemperature(temperature);
    req.socket.emit(`temperature:update`, { temperature });
    console.log("temperature:update");
    console.log({ temperature });
    res.status(200).json({ data: { temperature } });
  } catch (e) {
    console.error(e);
    res.status(404).json({ errors: [UNKNOWN_ERROR] });
  }
});

export default router;
