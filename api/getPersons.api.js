import axios from "axios";
import { API_BASE_URI } from "./constants";


const getPersons = async (id, page=1) => {
  if (page === 0) return {};

  try {
    const result = await axios.get(`${API_BASE_URI}/person/${id}&page=${page}`);
    return result;
  } catch (error) {
    console.error(error);
    return {};
  }
}

export default getPersons;
