import axios from "axios";
import { API_BASE_URI } from "./constants";


const getTVShows = async (filterBy) => {
  try {
    const result = await axios.get(`${API_BASE_URI}/tv/${filterBy}`);
    return result;
  } catch (error) {
    console.error(error);
  }
}

export default getTVShows;
