import { Server } from "socket.io";
import { registerLedEvents } from "./leds";
import { registerJoystickEvents } from "./joystick";

const registerEvents = (io: Server) => {
  io.on("connection", (socket) => {
    console.log("A user has connected");

    registerLedEvents(socket);
    registerJoystickEvents(socket);
  });
};

export default registerEvents;
