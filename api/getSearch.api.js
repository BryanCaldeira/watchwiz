import axios from "axios";
import { API_BASE_URI } from "./constants";


const getSearch = async (filterBy, query) => {
  if (query?.trim() === "") {
    return []
  }
  try {
    const result = await axios.get(`${API_BASE_URI}/search/${filterBy}?query="${encodeURI(query)}"`);
    return result;
  } catch (error) {
    console.error(error);
  }
}

export default getSearch;
