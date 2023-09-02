"use strict";
/** @format */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const express_1 = __importDefault(require("express"));
const node_cache_1 = __importDefault(require("node-cache"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const port = 8000;
const app = (0, express_1.default)();
const cache = new node_cache_1.default({ stdTTL: 600 }); // Cache results for 10 minutes
// Define rate limits for different routes
const searchRateLimiter = (0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000,
    max: 50, // Limit to 50 requests per IP for /search route
});
const moviesRateLimiter = (0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000,
    max: 100, // Limit to 100 requests per IP for /movies route
});
app.use(express_1.default.json());
// Apply rate limiters to specific routes
app.use('/search/:title', searchRateLimiter);
app.use('/movie/:movieId', moviesRateLimiter);
const apiKey = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3OTk1ZGE4NTQ3NGM0MjY0ZjU0MjRlMjlkN2JkOGY4NSIsInN1YiI6IjY0ZjMzY2NlM2Q0M2UwMDBmZTI3NGVmZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.lLzleyQ8W6nh1dhUJsDkCDh4PP2Ng2udBgU93PDesbA';
const options = {
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${apiKey}`,
    },
};
// Gets movies with similar titles
app.get('/search/:title', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const title = req.params.title;
    try {
        const page = req.query.page || 1;
        const cacheKey = `s-${title}`;
        const url = `https://api.themoviedb.org/3/search/movie?query=${title}&language=en-US&page=${page}`;
        const response = yield axios_1.default.get(url, options);
        // Check cache first
        const cachedResult = cache.get(cacheKey);
        if (cachedResult) {
            return res.json(cachedResult);
        }
        cache.set(cacheKey, response.data.results);
        res.json(response.data.results);
    }
    catch (error) {
        console.error('Error fetching search results:', error);
        res
            .status(500)
            .json({ error: `Error fetching search results for ${title}` });
    }
}));
// Gets individual movie by id
app.get('/movie/:movieId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const movieId = req.params.movieId;
    try {
        const cacheKey = `m-${movieId}`;
        const url = `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`;
        const response = yield axios_1.default.get(url, options);
        // Check cache first
        const cachedResult = cache.get(cacheKey);
        if (cachedResult) {
            return res.json(cachedResult);
        }
        cache.set(cacheKey, response.data);
        res.json(response.data);
    }
    catch (error) {
        console.error(`Error fetching movie details for: ${movieId} `, error);
        res.status(500).json({
            error: `Incorrect MovieId (${movieId}) submitted or server error.`,
        });
    }
}));
app.listen(port, () => {
    console.log(`Server running on port ${port}.`);
});
