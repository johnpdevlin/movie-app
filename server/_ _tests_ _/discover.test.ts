/** @format */

import request from 'supertest';
import { app } from '../index'; // Import your Express app instance

// Import the functions/formatting you're using in the route handler
import { formatQueryParam } from '../functions/src/formatParams';

describe('GET /discover/', () => {
	it('should respond with status 200 and JSON data', async () => {
		const response = await request(app).get('/discover/').query({
			// Your query parameters here
		});

		expect(response.status).toBe(200);
		expect(response.type).toBe('application/json');
		// Add more assertions for the response body if needed
	});

	it('should respond with status 500 on error', async () => {
		// Mock the behavior of your route handler when it encounters an error
		jest.spyOn(app, 'get').mockImplementation(() => {
			throw new Error('Some error');
		});

		const response = await request(app).get('/discover/').query({
			// Your query parameters here
		});

		expect(response.status).toBe(500);
		expect(response.type).toBe('application/json');
		// Add more assertions for the error response body if needed
	});
});
