import axios from "axios";
import { API_BASE_URI } from "./constants";


const getMovies = async (filterBy) => {
  try {
    const result = await axios.get(`${API_BASE_URI}/movie/${filterBy}`);
    return result;
  } catch (error) {
    console.error(error);
  }
}

export default getMovies;
