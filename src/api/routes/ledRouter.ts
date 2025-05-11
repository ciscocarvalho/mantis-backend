import { Router } from "express";
import { getLedState, getLedStates, Led, ledNameToId, setLedState } from "../../data/leds";
import { UNKNOWN_ERROR } from "../errors";

const router = Router();

router.get("/", async (req, res) => {
  try {
    res.status(200).json({
      data: {
        leds: Object.entries(getLedStates()).map((v) => ({ color: v[0], state: v[1] })),
      },
    });
  } catch (e) {
    console.error(e);
    res.status(404).json({ errors: [UNKNOWN_ERROR] });
  }
});

router.get("/:led", async (req, res) => {
  try {
    const { led } = req.params;
    res.status(200).json({ data: { state: getLedState(ledNameToId(led)) } });
  } catch (e) {
    console.error(e);
    res.status(404).json({ errors: [UNKNOWN_ERROR] });
  }
});

router.post("/:led", async (req, res) => {
  try {
    const { led } = req.params;
    const { state } = req.body;

    if (!Object.values(Led as any).includes(led)) {
      throw new Error();
    }

    setLedState(led as any, state);
    req.socket.emit(`led:state-changed`, { led, state });
    res.status(200).json({ data: { led, state } });
  } catch (e) {
    console.error(e);
    res.status(404).json({ errors: [UNKNOWN_ERROR] });
  }
});

export default router;
