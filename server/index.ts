/** @format */

import express from 'express';
import NodeCache from 'node-cache';

const port = 8000;
const app = express();

const cache = new NodeCache({ stdTTL: 600 }); // Cache results for 10 minutes

app.get('/search/:title', (req, res) => {
	const title = req.params.title;
	const cacheKey = `s-${title}`;
	const response = {
		data: {
			hello: title,
		},
	};
	// Check cache first
	const cachedResult = cache.get(cacheKey);
	if (cachedResult) {
		return res.json(cachedResult);
	}

	cache.set(cacheKey, response.data);
	return res.json(response.data);
});

app.get('/movie/:movieId', (req, res) => {
	const movieId = req.params.movieId;

	const cacheKey = `m-${movieId}`;
	const response = {
		data: {
			hello: movieId,
		},
	};
	// Check cache first
	const cachedResult = cache.get(cacheKey);
	if (cachedResult) {
		return res.json(cachedResult);
	}

	cache.set(cacheKey, response.data);
	return res.json(response.data);
});

app.listen(port, () => {
	console.log(`Server running on port ${port}.`);
});
