import { err, ok, Result } from "neverthrow";
import { io, Socket } from "socket.io-client";
import { Events } from "./events";

let socket: Socket;

export function init(input: { jwt: string }): Promise<Result<void, Error>> {
  socket = io(import.meta.env.REACT_APP_HELOU_HOST_SOCKET_URL, {
    extraHeaders: {
      Authorization: `Bearer ${input.jwt}`,
    },
  });

  const p = new Promise<Result<void, Error>>((resolve, reject) => {
    socket.on(Events.CloseReason, (reason) => {
      reject(err(reason));
    });

    socket.on("connect", () => {
      resolve(ok(undefined));
    });
  });

  return p;
}

function on<T = any>(
  event: string,
  callback: (data: { new_val?: T; old_val?: T }) => void
): void {
  if (!socket) {
    socket = io(import.meta.env.REACT_APP_ATELIER_CHAT_SOCKET_URL);
  }

  socket.on(event, callback);
}

function get(): Socket {
  if (!socket) {
    socket = io(import.meta.env.REACT_APP_ATELIER_CHAT_SOCKET_URL);
  }

  return socket;
}

const socketIO = {
  get,
  on,
  init,
};

export default socketIO;
