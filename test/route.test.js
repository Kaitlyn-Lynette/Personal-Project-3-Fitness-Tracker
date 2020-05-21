// Test Routes
const axios = require('axios');
describe('HTML Routes', () => {
  describe('GET /', () => {
    it('should return a status code of 200', async () => {
      const { status } = await axios.get('/');
      expect(status).toBe(200);
    });
    it('should have content type html', async () => {
      const expectedContentType = 'text/html';
      const { headers } = await axios.get('/');
      const hasJSON =
        JSON.stringify(headers).indexOf(expectedContentType) !== -1;
      expect(hasJSON).toBe(true);
    });
  });

});