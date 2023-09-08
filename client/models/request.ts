/** @format */

export type language = string;
export type include_video = boolean;
export type include_adult = boolean;
export type primary_release_year = number;
export type page = number;
export type sort_by =
	| 'popularity.desc'
	| 'popularity.asc'
	| 'revenue.asc'
	| 'revenue.desc'
	| 'primary_release_date.asc'
	| 'primary_release_date.desc'
	| 'vote_average.asc'
	| 'vote_average.desc'
	| 'vote_count.asc'
	| 'vote_count.desc';
export type vote_average_gte = number;
export type vote_average_lte = number;
export type vote_count_gte = number;
export type vote_count_lte = number;
export type with_cast = string;
export type with_crew = string;
export type with_genres = string;
export type with_keywords = string;
export type with_people = string;
export type with_runtime_gte = string;
export type with_runtime_lte = string;
export type with_original_language = string;
export type without_genres = string;
export type with_release_type = string;
export type year = number;

export type request_param =
	| language
	| include_video
	| include_adult
	| primary_release_year
	| page
	| sort_by
	| vote_average_gte
	| vote_average_lte
	| vote_count_gte
	| vote_count_lte
	| with_cast
	| with_crew
	| with_genres
	| with_keywords
	| with_people
	| with_runtime_gte
	| with_runtime_lte
	| with_original_language
	| without_genres
	| with_release_type
	| year;
export type request_params = request_param[];
