import {
  REACT_APP_ATELIER_HOST_SOCKET_URL,
  REACT_APP_ATELIER_CHAT_URL,
} from "@env";

const $env = {
  REACT_APP_ATELIER_HOST_SOCKET_URL,
  REACT_APP_ATELIER_CHAT_URL,
};

function get(varName: string): string {
  // @ts-ignore
  return ($env[varName] as string) ?? "";
}

const env = {
  get,
};

export default env;
