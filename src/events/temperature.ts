import { Socket } from "socket.io";

export const registerTemperatureEvents = (socket: Socket) => {
  const broadcastLedState = (temperature: number) => {
    socket.broadcast.emit("temperature:update", temperature);
  };

  const onTemperatureUpdate = (temperature: number) => {
    console.log(`temperature update: ${temperature}`);
    broadcastLedState(temperature);
  };

  socket.on("temperature:update", (temperature: number) => {
    onTemperatureUpdate(temperature);
  });
};
