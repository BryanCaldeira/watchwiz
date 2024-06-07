import axios from "axios";
import { API_BASE_URI } from "./constants";


const getPersons = async (id) => {
  try {
    const result = await axios.get(`${API_BASE_URI}/person/${id}`);
    return result;
  } catch (error) {
    console.error(error);
  }
}

export default getPersons;
