const { getGames, getGameById } = require('../controllers/index');
const { app } = require('../index');
const request = require('supertest');
const http = require('http');

jest.mock('../controllers/index', () => ({
  ...jest.requireActual('../controllers/index'),
  getGames: jest.fn(),
  getGameById: jest.fn(),
}));

let server;

beforeAll(async () => {
  server = http.createServer(app);
  server.listen(3001);
});

afterAll(() => {
  server.close();
});

describe('Test Api Endpoints', () => {
  // 3
  it('GET /games should get all games', async () => {
    const mockGames = [
      {
        gameId: 1,
        title: 'The Legend of Zelda: Breath of the Wild',
        genre: 'Adventure',
        platform: 'Nintendo Switch',
      },
      {
        gameId: 2,
        title: 'Red Dead Redemption 2',
        genre: 'Action',
        platform: 'PlayStation 4',
      },
      {
        gameId: 3,
        title: 'The Witcher 3: Wild Hunt',
        genre: 'RPG',
        platform: 'PC',
      },
    ];

    getGames.mockReturnValue(mockGames);
    const res = await request(server).get('/games');
    expect(res.status).toBe(200);
    expect(res.body).toEqual(mockGames);
    expect(res.body.length).toBe(3);
  });

  // 4
  it('GET /games/details/:id should return game by Id', async () => {
    const mockGame = {
      gameId: 1,
      title: 'The Legend of Zelda: Breath of the Wild',
      genre: 'Adventure',
      platform: 'Nintendo Switch',
    };

    getGameById.mockReturnValue(mockGame);
    const res = await request(server).get('/games/details/1');
    expect(res.status).toBe(200);
    expect(res.body).toEqual(mockGame);
  });
});

// 5
describe('Test controller function', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it('GET /games should return all games', () => {
    const mockGames = [
      {
        gameId: 1,
        title: 'The Legend of Zelda: Breath of the Wild',
        genre: 'Adventure',
        platform: 'Nintendo Switch',
      },
      {
        gameId: 2,
        title: 'Red Dead Redemption 2',
        genre: 'Action',
        platform: 'PlayStation 4',
      },
      {
        gameId: 3,
        title: 'The Witcher 3: Wild Hunt',
        genre: 'RPG',
        platform: 'PC',
      },
    ];

    getGames.mockReturnValue(mockGames);
    const result = getGames();
    expect(result).toEqual(mockGames);
    expect(result.length).toBe(3);
  });
});
