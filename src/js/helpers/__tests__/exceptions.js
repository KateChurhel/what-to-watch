import { RequestError } from '../exceptions';
import DEFAULT_ERROR from '../../constants/errors';

describe('RequestError: ', () => {
  it('returns default error', () => {
    try {
      throw new RequestError();
    } catch ({ message }) {
      expect(message).toEqual(DEFAULT_ERROR);
    }
  });

  it('returns correct error', () => {
    const mockMessage = 'Test Error message';
    try {
      throw new RequestError(400, { message: mockMessage });
    } catch ({ message }) {
      expect(message).toEqual(mockMessage);
    }
  });
});
