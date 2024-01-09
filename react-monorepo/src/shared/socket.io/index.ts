import { err, ok, Result } from "neverthrow";
import { io, Socket } from "socket.io-client";

import { Events } from "./events";
import env from "@atelier/shared/env";

let socket: Socket;

export function init(input: { jwt: string }): Promise<Result<void, Error>> {
  socket = io(env.get("REACT_APP_ATELIER_HOST_SOCKET_URL"), {
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
    socket = io(env.get("REACT_APP_ATELIER_HOST_SOCKET_URL"));
  }

  socket.on(event, callback);
}

function get(): Socket {
  if (!socket) {
    socket = io(env.get("REACT_APP_ATELIER_HOST_SOCKET_URL"));
  }

  return socket;
}

const socketIO = {
  get,
  on,
  init,
};

export default socketIO;
