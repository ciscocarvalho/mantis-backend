import { Socket } from "socket.io";
import { JoystickInfo } from "../data/joystick";

export const registerJoystickEvents = (socket: Socket) => {
  const broadcastLedState = (info: JoystickInfo) => {
    socket.broadcast.emit("joystick:update", { ...info });
  };

  const onJoystickUpdate = (info: JoystickInfo) => {
    console.log(`Joystick update: [x: ${info.x}, y: ${info.y}]`);
    broadcastLedState(info);
  };

  socket.on("joystick:update", (info: JoystickInfo) => {
    onJoystickUpdate(info);
  });
};
