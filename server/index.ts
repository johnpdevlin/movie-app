/** @format */

import axios from 'axios';
import express, { Request, Response, NextFunction } from 'express';
import NodeCache from 'node-cache';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import helmet from 'helmet';
import cors from 'cors';
import { RequestParam, RequestParams, formatQueryParam } from './formatParams';

dotenv.config();

const port = process.env.PORT || 8000;
export const app = express();

// Allow all CORS requests during development
if (process.env.NODE_ENV === 'development') {
	app.use(cors());
} else {
	const allowedOrigin = process.env.ORIGIN_URL;

	const corsOptions = {
		origin: (
			origin: string | undefined,
			callback: (err: Error | null, allow?: boolean) => void
		) => {
			// Check if the origin is in the allowed list
			if (origin && allowedOrigin && origin === allowedOrigin) {
				callback(null, true);
			} else {
				callback(new Error('Not allowed by CORS'));
			}
		},
	};
	app.use(cors(corsOptions));
}

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
app.use(helmet()); // security headers

// Apply rate limiters to specific routes
if (process.env.NODE_ENV !== 'development') {
	app.use('/search/:title', searchRateLimiter);
	app.use('/movie/:movieId', moviesRateLimiter);
}

const apiKey = process.env.TMDB_API_KEY;

const options = {
	headers: {
		accept: 'application/json',
		Authorization: `Bearer ${apiKey}`,
	},
};

// Error handling middleware for rate limiting
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
	if (err.name === 'RateLimitError') {
		// Rate limit exceeded, return 429 status
		return res.status(429).json({ error: 'Rate limit exceeded' });
	}
	next(err);
});

// Gets movies with similar titles
app.get('/search/:title', async (req: Request, res: Response) => {
	let title = req.params.title;
	let page = '1';

	try {
		if (title.includes('page')) {
			[title, page] = req.params.title.split('&page=');
		}
		const cacheKey = `s-${title}${page}`;

		const url = `https://api.themoviedb.org/3/search/movie?query=${title}&language=en-US&page=${page}`;

		const response = await axios.get(url, options);

		// Check cache first
		const cachedResult = cache.get(cacheKey);
		if (cachedResult) {
			return res.status(200).json(cachedResult as JSON[]);
		}

		cache.set(cacheKey, response.data);
		res.status(200).json(response.data);
	} catch (error) {
		res
			.status(500)
			.json({ error: `Error fetching search results for ${title}` });
	}
});

// Gets movies by advanced query
app.get('/discover/', async (req, res) => {
	const queryParams: RequestParams = {};

	for (const param of Object.keys(req.query)) {
		if (param in queryParams) {
			queryParams[param as RequestParam] = req.query[param] as string;
		}
	}

	const queryString = Object.entries(queryParams)
		.map(([param, value]) => formatQueryParam(param, value as string))
		.join('&');

	try {
		const cacheKey = `q-${queryString}`;

		const url = `https://api.themoviedb.org/3/discover/movie?${queryString}`;

		const response = await axios.get(url, options);

		// Check cache first
		const cachedResult = cache.get(cacheKey);
		if (cachedResult) {
			return res.status(200).json(cachedResult as JSON[]);
		}

		cache.set(cacheKey, response.data);
		res.status(200).json(response.data);
	} catch (error) {
		res
			.status(500)
			.json({ error: `Error fetching search results for ${queryString}` });
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
			return res.status(200).json(cachedResult as JSON);
		}

		cache.set(cacheKey, response.data);
		res.status(200).json(response.data);
	} catch (error) {
		res.status(500).json({
			error: `Incorrect MovieId (${movieId}) submitted or server error.`,
		});
	}
});

// For checks by render serverless app
app.get('/healthz', async (req: Request, res: Response) => {
	res.status(200).json({ status: 'ok' });
});

app.listen(port, () => {
	console.log(`Server running on port ${port}.`);
});
