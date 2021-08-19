import axios from "axios";
import { Location } from "Interfaces";

const getLocation = async (locationUrl: string): Promise<Location[]> => {
  const res = await axios.get(locationUrl);
  return res.data;
};

export default getLocation;
