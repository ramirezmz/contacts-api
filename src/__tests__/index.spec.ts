import { double} from '../index';

describe('Testing index file', () => {
  it('should double a number', () => {
    expect(double(2)).toBe(4);
  })
})