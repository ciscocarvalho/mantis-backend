import { Socket } from "socket.io";
import { Led, ledIdToName, LedState, LedStateValue } from "../data/leds";

export const registerLedEvents = (socket: Socket) => {
  const broadcastLedState = (led: Led, state: LedState) => {
    socket.broadcast.emit(`led:state-changed`, { led, state });
  };

  const onLedState = (led: Led, state: LedStateValue) => {
    console.log(`Led ${ledIdToName(led)} ${state}`);
    broadcastLedState(led, state);
  };

  socket.on("led:state-changed", ({ led, state }: { led: Led; state: LedState }) => {
    onLedState(led, state);
  });
};
