import axios from "axios";

const instance = axios.create({
  baseURL: `${import.meta.env.REACT_APP_ATELIER_CHAT_URL}`,
});

export default instance;
