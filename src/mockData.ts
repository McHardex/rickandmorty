const mockData = {
  character: {
    id: 7,
    name: "Abradolf Lincler",
    status: "unknown",
    species: "Human",
    type: "Genetic experiment",
    gender: "Male",
    origin: {
      name: "Earth (Replacement Dimension)",
      url: "https://rickandmortyapi.com/api/location/20",
    },
    location: {
      id: 21,
      name: "Testicle Monster Dimension",
      type: "Dimension",
      dimension: "Testicle Monster Dimension",
      gender: "Male",
      residents: [
        "https://rickandmortyapi.com/api/character/7",
        "https://rickandmortyapi.com/api/character/436",
      ],
      url: "https://rickandmortyapi.com/api/location/21",
      created: "2017-11-18T19:41:01.605Z",
    },
    image: "https://rickandmortyapi.com/api/character/avatar/7.jpeg",
    episode: [
      {
        id: 10,
        name: "Close Rick-counters of the Rick Kind",
        air_date: "April 7, 2014",
        episode: "S01E10",
        characters: [
          "https://rickandmortyapi.com/api/character/1",
          "https://rickandmortyapi.com/api/character/2",
        ],
        url: "https://rickandmortyapi.com/api/episode/10",
        created: "2017-11-10T12:56:34.747Z",
      },
    ],
    url: "https://rickandmortyapi.com/api/character/7",
    created: "2017-11-04T19:59:20.523Z",
  },
  episode: [
    {
      id: 1,
      name: "Pilot",
      air_date: "December 2, 2013",
      episode: "S01E01",
      characters: [
        "https://rickandmortyapi.com/api/character/1",
        "https://rickandmortyapi.com/api/character/2",
        "https://rickandmortyapi.com/api/character/35",
      ],
      url: "https://rickandmortyapi.com/api/episode/1",
      created: "2017-11-10T12:56:33.798Z",
    },
  ],
  location: {
    id: 20,
    name: "Earth (Replacement Dimension)",
    type: "Planet",
    dimension: "Replacement Dimension",
    residents: ["https://rickandmortyapi.com/api/character/1"],
    url: "https://rickandmortyapi.com/api/location/20",
    created: "2017-11-18T19:33:01.173Z",
    gender: "male",
  },
  info: {
    count: 1,
    pages: 1,
    next: null,
    prev: null,
  },
};

export default mockData;
