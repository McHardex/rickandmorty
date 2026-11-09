import axios from "axios";

const normalizeResourceList = <T>(payload: T | T[]): T[] =>
  Array.isArray(payload) ? payload : [payload];

const fetchResourcesById = async <T extends { id: number }>(
  collectionUrl: string | null,
  ids: number[]
): Promise<Map<number, T>> => {
  if (!collectionUrl || ids.length === 0) return new Map();

  const response = await axios.get<T | T[]>(
    `${collectionUrl}/${ids.join(",")}`
  );
  const resources = normalizeResourceList(response.data);

  return new Map(resources.map((resource) => [resource.id, resource]));
};

export default fetchResourcesById;
