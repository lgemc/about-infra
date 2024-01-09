import axios from "axios";

import env from "@atelier/shared/env";
const instance = axios.create({
  baseURL: env.get("REACT_APP_ATELIER_CHAT_URL"),
});

export default instance;
