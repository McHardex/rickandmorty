export const idFromResourceUrl = (
  url: string | null | undefined
): number | null => {
  if (!url) return null;

  const segment = url.split("/").filter(Boolean).pop();
  if (!segment || !/^\d+$/.test(segment)) return null;

  return Number(segment);
};

export const collectionUrlFromResourceUrl = (
  url: string | null | undefined
): string | null => {
  const id = idFromResourceUrl(url);
  if (id === null || !url) return null;

  const suffix = `/${id}`;
  if (!url.endsWith(suffix)) return null;

  return url.slice(0, -suffix.length);
};

export const firstCollectionUrl = (
  urls: Array<string | null | undefined>
): string | null => {
  for (const url of urls) {
    const collectionUrl = collectionUrlFromResourceUrl(url);
    if (collectionUrl) return collectionUrl;
  }

  return null;
};

export const uniqueIds = (
  urls: Array<string | null | undefined>
): number[] => {
  const ids = new Set<number>();

  urls.forEach((url) => {
    const id = idFromResourceUrl(url);
    if (id !== null) ids.add(id);
  });

  return Array.from(ids);
};
