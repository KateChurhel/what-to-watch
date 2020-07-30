import { sendGetRequest } from '../index';
import { RequestError } from '../../helpers/exceptions';

jest.mock('../../helpers/exceptions');

describe('Test Api: ', () => {
  let fetchMock;
  let mockSuccessResponse;
  let mockFetchPromise;

  beforeEach(() => {
    mockSuccessResponse = {
      test: 'test',
    };
    mockFetchPromise = Promise.resolve({
      status: 200,
      json: jest.fn(() => (mockSuccessResponse)),
      headers: { get: () => 'application/json' },
      ok: true,
    });
    fetchMock = jest.fn(() => mockFetchPromise);
    jest.spyOn(global, 'fetch').mockImplementation(fetchMock);
    RequestError.mockImplementation((status, responseData) => ({ ...responseData, status }));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  it('Test send get api request', async () => {
    const result = await sendGetRequest('/test');

    expect(fetchMock).toHaveBeenCalled();
    expect(result).toEqual(mockSuccessResponse);
  });

  it('Test send get api request', async () => {
    const errorMessage = 'Test message';
    mockFetchPromise = Promise.resolve({
      status: 400,
      json: jest.fn(() => ({ message: errorMessage })),
      headers: { get: () => 'application/json' },
      ok: false,
    });
    expect.assertions(1);
    try {
      await sendGetRequest();
    } catch (e) {
      expect(e.message).toBe(errorMessage);
    }
  });
});
