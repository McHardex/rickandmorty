import { CharactersInfo } from "Interfaces";

const charactersInfo = (
  next: string | null = null,
  prev: string | null = null,
  overrides: Partial<CharactersInfo> = {}
): CharactersInfo => ({
  count: 42,
  pages: 3,
  next,
  prev,
  ...overrides,
});

export default charactersInfo;
