/** @format */
// Should match model in client
export type RequestParam =
	| 'language'
	| 'include_video'
	| 'include_adult'
	| 'primary_release_year'
	| 'primary_release_date_lte'
	| 'primary_release_date_gte'
	| 'page'
	| 'sort_by'
	| 'vote_average_gte'
	| 'vote_average_lte'
	| 'vote_count_gte'
	| 'vote_count_lte'
	| 'with_cast'
	| 'with_crew'
	| 'with_genres'
	| 'with_keywords'
	| 'with_people'
	| 'with_runtime_gte'
	| 'with_runtime_lte'
	| 'with_original_language'
	| 'without_genres'
	| 'with_release_type'
	| 'year';

export type RequestParams = {
	[key in RequestParam]?: string;
};

export function formatQueryParam(param: string, value: string): string {
	// Replace underscores (_) with periods (.) for "lte" and "gte" conditions
	param = param.replace('_lte', '.lte').replace('_gte', '.gte');
	return `${param}=${value}`;
}
