import { Router } from "express";
import { getButtonInfo, getButtonsInfo, setButtonInfo } from "../../data/buttons";
import { UNKNOWN_ERROR } from "../errors";

const router = Router();

router.get("/", async (req, res) => {
  try {
    res.status(200).json({ data: { buttons: getButtonsInfo() } });
  } catch (e) {
    console.error(e);
    res.status(404).json({ errors: [UNKNOWN_ERROR] });
  }
});

router.get("/:button", async (req, res) => {
  try {
    const { button } = req.params;
    res.status(200).json({ data: { buttonData: getButtonInfo(button as any) } });
  } catch (e) {
    console.error(e);
    res.status(404).json({ errors: [UNKNOWN_ERROR] });
  }
});

router.post("/:button", async (req, res) => {
  try {
    const { button } = req.params;
    const { state } = req.body;

    setButtonInfo(button as any, { state });
    const buttonsInfo = { [button]: { state } };
    req.socket.emit(`buttons:update`, buttonsInfo);
    console.log("buttons:update");
    res.status(200).json({ data: { buttonsData: buttonsInfo } });
  } catch (e) {
    console.error(e);
    res.status(404).json({ errors: [UNKNOWN_ERROR] });
  }
});

export default router;
