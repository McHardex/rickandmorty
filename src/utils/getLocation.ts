import axios from "axios";
import { Location } from "Interfaces";

const getLocation = async (locationUrl: string): Promise<Location[]> => {
  try {
    const res = await axios.get(locationUrl);
    return res.data;
  } catch (error) {
    throw new Error(error);
  }
};

export default getLocation;
