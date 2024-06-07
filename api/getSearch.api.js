import axios from "axios";
import { API_BASE_URI } from "./constants";


const getSearch = async (filterBy, query, page=1) => {
  if (query?.trim() === "" || page === 0) {
    return {}
  }

  try {
    const result = await axios.get(`${API_BASE_URI}/search/${filterBy}?query="${encodeURI(query)}"&page=${page}`);
    return result;
  } catch (error) {
    console.error(error);
    return {}
  }
}

export default getSearch;
