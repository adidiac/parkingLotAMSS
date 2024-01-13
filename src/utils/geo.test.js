import { getCoordinates } from './geo';

describe('getCoordinates', () => {
    it('should return the coordinates for a given location name', async () => {
        const locationName = 'New York';
        const expectedCoordinates = {
            latitude: 40.7128,
            longitude: -74.0060,
        };

        const coordinates = await getCoordinates(locationName);

        expect(coordinates).toEqual(expectedCoordinates);
    });
});
