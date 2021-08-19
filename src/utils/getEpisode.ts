import axios from "axios";
import { Episode } from "Interfaces";

const getEpisode = async (episodeUrl: string): Promise<Episode[]> => {
  const res = await axios.get(episodeUrl);
  return res.data;
};

export default getEpisode;
