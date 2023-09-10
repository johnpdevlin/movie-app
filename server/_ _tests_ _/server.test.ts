/** @format */

import { app } from '../index';
import request from 'supertest';

describe('Movie API Tests', () => {
	it('should return list of movie genres', async () => {
		const response = await request(app).get(`/genres/list`);
		expect(response.status).toBe(200);
	});

	it('should handle error for bad request to genres', async () => {
		const response = await request(app).get(`/genres/lisp`);
		expect(response.status).toBe(500);
	});
	it('should return a list of movies when searching by title', async () => {
		const response = await request(app).get('/search/horse');
		expect(response.status).toBe(200);
		const movieInfo = response.body;
		expect(movieInfo).toBeDefined();
		expect(movieInfo.length).toBeGreaterThan(0);
	});

	it('should return a list of movies when searching by language, page and sorted', async () => {
		const response = await request(app).get(
			'/discover/?language=en-US&page=1&sort_by=popularity.desc'
		);
		expect(response.status).toBe(200);
		const movieInfo = response.body;
		expect(movieInfo).toBeDefined();
		expect(movieInfo.length).toBeGreaterThan(0);
	});

	it('should return a list of movies when searching by genre, with a runtime gte 120 and page 2', async () => {
		const response = await request(app).get(
			'/discover/?with_genres=28&with_runtime_gte=120&page=2'
		);
		expect(response.status).toBe(200);
		const movieInfo = response.body;
		expect(movieInfo).toBeDefined();
		expect(movieInfo.length).toBeGreaterThan(0);
	});

	it('should return details of a specific movie by ID', async () => {
		const movieId = '123';
		const response = await request(app).get(`/movie/${movieId}`);
		expect(response.status).toBe(200);
		const movieDetails = response.body;
		expect(movieDetails).toBeDefined();
	});

	it('should handle incorrect movie ID when fetching movie details', async () => {
		const invalidMovieId = 'invalid'; // An invalid movie ID
		const response = await request(app).get(`/movie/${invalidMovieId}`);
		expect(response.status).toBe(500);
	});

	it('should handle incorrect params when fetching movie details', async () => {
		const response = await request(app).get(`/discover/invalid/`);
		expect(response.status).toBe(500);
	});

	it('should handle rate limiting for /search/:title route', async () => {
		const promises = Array.from({ length: 200 }, () =>
			request(app).get('/search/rate-limit-test')
		);
		const responses = await Promise.all(promises);
		expect(responses[responses.length - 1].status).toBe(429);
	});

	it('should handle rate limiting for /movie/:movieId route', async () => {
		const promises = Array.from({ length: 200 }, () =>
			request(app).get('/movie/11')
		);
		const responses = await Promise.all(promises);
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
