import axios from "axios";
import { API_BASE_URI } from "./constants";


const getMovies = async (filterBy, page=1) => {
  if (page === 0) return {};

  try {
    const result = await axios.get(`${API_BASE_URI}/movie/${filterBy}?page=${page}`);
    return result;
  } catch (error) {
    console.error(error);
    return {}
  }
}

export default getMovies;
