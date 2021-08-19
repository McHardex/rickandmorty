import axios from "axios";
import { Episode } from "Interfaces";

const getEpisode = async (episodeUrl: string): Promise<Episode[]> => {
  try {
    const res = await axios.get(episodeUrl);
    return res.data;
  } catch (error) {
    throw new Error(error);
  }
};

export default getEpisode;
