/** @format */

import { app } from '../index';
import request from 'supertest';

describe('Movie API Tests', () => {
	it('should return a list of movies when searching by title', async () => {
		const response = await request(app).get('/search/inception');
		expect(response.status).toBe(200);

		// Check that the response body matches the MovieInfo type
		const movieInfo = response.body;
		expect(movieInfo).toBeDefined();
		// Ensure the response length is greater than 0
		expect(movieInfo.length).toBeGreaterThan(0);
	});

	it('should return details of a specific movie by ID', async () => {
		const movieId = '123';
		const response = await request(app).get(`/movie/${movieId}`);
		expect(response.status).toBe(200);

		// Check that the response body matches the MovieDetails type
		const movieDetails = response.body;
		expect(movieDetails).toBeDefined();
	});

	it('should handle incorrect movie ID when fetching movie details', async () => {
		const invalidMovieId = 'invalid'; // An invalid movie ID
		const response = await request(app).get(`/movie/${invalidMovieId}`);
		expect(response.status).toBe(500);
	});

	it('should handle rate limiting for /search/:title route', async () => {
		// Perform more than the allowed number of requests in a short time frame
		const promises = Array.from({ length: 200 }, () =>
			request(app).get('/search/rate-limit-test')
		);

		// Wait for all requests to complete and collect their responses
		const responses = await Promise.all(promises);

		// Expect that the last request exceeds the rate limit (429 Too Many Requests)
		expect(responses[responses.length - 1].status).toBe(429);
	});

	it('should handle rate limiting for /movie/:movieId route', async () => {
		// Perform more than the allowed number of requests in a short time frame
		const promises = Array.from({ length: 200 }, () =>
			request(app).get('/movie/11')
		);

		// Wait for all requests to complete and collect their responses
		const responses = await Promise.all(promises);

		// Expect that the last request exceeds the rate limit (429 Too Many Requests)
		expect(responses[responses.length - 1].status).toBe(429);
	});

	it('should handle missing query parameter for /search/:title route', async () => {
		const response = await request(app).get('/search/');
		expect(response.status).toBe(404);
	});

	it('should handle invalid JSON in request body', async () => {
		const response = await request(app)
			.post('/some-endpoint')
			.send('Invalid JSON'); // Sending invalid JSON
		expect(response.status).toBe(404);
	});
});
