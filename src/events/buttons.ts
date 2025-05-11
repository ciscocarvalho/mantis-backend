import { Socket } from "socket.io";
import { ButtonsInfo } from "../data/buttons";

export const registerButtonsEvents = (socket: Socket) => {
  const broadcastLedState = (info: Partial<ButtonsInfo>) => {
    socket.broadcast.emit("buttons:update", { ...info });
  };

  const onButtonsUpdate = (info: Partial<ButtonsInfo>) => {
    console.log(`Buttons update: ${info}`);
    broadcastLedState(info);
  };

  socket.on("buttons:update", (info: Partial<ButtonsInfo>) => {
    onButtonsUpdate(info);
  });
};
