import axios from "axios";
import { TOKEN } from '@env'

const setConfig = () => {
  // set global axios headers
  axios.defaults.headers.common['Authorization'] = `Bearer ${TOKEN}`;
}

export default setConfig;
