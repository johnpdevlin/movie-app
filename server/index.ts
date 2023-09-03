/** @format */

import axios from 'axios';
import express, { Request, Response } from 'express';
import NodeCache from 'node-cache';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';

dotenv.config();

const port = process.env.PORT || 8000;
const app = express();

const cache = new NodeCache({ stdTTL: 600 }); // Cache results for 10 minutes

// Define rate limits for different routes
const searchRateLimiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 75, // Limit to 50 requests per IP for /search route
});

const moviesRateLimiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 150, // Limit to 100 requests per IP for /movies route
});

app.use(express.json());

// Apply rate limiters to specific routes
app.use('/search/:title', searchRateLimiter);
app.use('/movie/:movieId', moviesRateLimiter);

const apiKey = process.env.TMDB_API_KEY;

const options = {
	headers: {
		accept: 'application/json',
		Authorization: `Bearer ${apiKey}`,
	},
};

// Gets movies with similar titles
app.get('/search/:title', async (req: Request, res: Response) => {
	const title = req.params.title;
	try {
		const page = req.query.page || 1;
		const cacheKey = `s-${title}`;

		const url = `https://api.themoviedb.org/3/search/movie?query=${title}&language=en-US&page=${page}`;

		const response = await axios.get(url, options);

		// Check cache first
		const cachedResult = cache.get(cacheKey);
		if (cachedResult) {
			res.status(200).json(cachedResult as JSON[]);
		}

		cache.set(cacheKey, response.data);
		res.status(200).json(response.data);
	} catch (error) {
		res
			.status(500)
			.json({ error: `Error fetching search results for ${title}` });
	}
});

// Gets individual movie by id
app.get('/movie/:movieId', async (req: Request, res: Response) => {
	const movieId = req.params.movieId;
	try {
		const cacheKey = `m-${movieId}`;
		const url = `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`;

		const response = await axios.get(url, options);

		// Check cache first
		const cachedResult: JSON | undefined = cache.get(cacheKey);
		if (cachedResult) {
			res.status(200).json(cachedResult as JSON);
		}

		cache.set(cacheKey, response.data);
		res.status(200).json(response.data);
	} catch (error) {
		res.status(500).json({
			error: `Incorrect MovieId (${movieId}) submitted or server error.`,
		});
	}
});

app.listen(port, () => {
	console.log(`Server running on port ${port}.`);
});
