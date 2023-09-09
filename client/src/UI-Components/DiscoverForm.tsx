/** @format */

// /** @format */

// import React, { useRef, FormEvent } from 'react';
// import Tooltip from '@mui/material/Tooltip';

// type MovieSearchFormData = {
// 	language: string;
// 	include_video: boolean;
// 	include_adult: boolean;
// 	primary_release_year: number;
// 	page: number;
// 	sort_by: string;
// 	vote_average_gte: number;
// 	vote_average_lte: number;
// 	vote_count_gte: number;
// 	vote_count_lte: number;
// 	with_cast: string;
// 	with_crew: string;
// 	with_genres: string;
// 	with_keywords: string;
// 	with_people: string;
// 	with_runtime_gte: string;
// 	with_runtime_lte: string;
// 	with_original_language: string;
// 	without_genres: string;
// 	with_release_type: string;
// 	year: number;
// };

// function MovieSearchForm() {
// 	const languageRef = useRef<HTMLInputElement | null>(null);
// 	const includeVideoRef = useRef<HTMLInputElement | null>(null);
// 	const includeAdultRef = useRef<HTMLInputElement | null>(null);
// 	const primaryReleaseYearRef = useRef<HTMLInputElement | null>(null);
// 	const pageRef = useRef<HTMLInputElement | null>(null);
// 	const sortByRef = useRef<HTMLInputElement | null>(null);
// 	const voteAverageGteRef = useRef<HTMLInputElement | null>(null);
// 	const voteAverageLteRef = useRef<HTMLInputElement | null>(null);
// 	const voteCountGteRef = useRef<HTMLInputElement | null>(null);
// 	const voteCountLteRef = useRef<HTMLInputElement | null>(null);
// 	const withCastRef = useRef<HTMLInputElement | null>(null);
// 	const withCrewRef = useRef<HTMLInputElement | null>(null);
// 	const withGenresRef = useRef<HTMLInputElement | null>(null);
// 	const withKeywordsRef = useRef<HTMLInputElement | null>(null);
// 	const withPeopleRef = useRef<HTMLInputElement | null>(null);
// 	const withRuntimeGteRef = useRef<HTMLInputElement | null>(null);
// 	const withRuntimeLteRef = useRef<HTMLInputElement | null>(null);
// 	const withOriginalLanguageRef = useRef<HTMLInputElement | null>(null);
// 	const withoutGenresRef = useRef<HTMLInputElement | null>(null);
// 	const withReleaseTypeRef = useRef<HTMLInputElement | null>(null);
// 	const yearRef = useRef<HTMLInputElement | null>(null);

// 	const handleSubmit = (e: FormEvent) => {
// 		e.preventDefault();

// 		const formData: MovieSearchFormData = {
// 			language: languageRef.current?.value || '',
// 			include_video: !!includeVideoRef.current?.checked,
// 			include_adult: !!includeAdultRef.current?.checked,
// 			primary_release_year: Number(primaryReleaseYearRef.current?.value || 0),
// 			page: Number(pageRef.current?.value || 0),
// 			sort_by: sortByRef.current?.value || '',
// 			vote_average_gte: Number(voteAverageGteRef.current?.value || 0),
// 			vote_average_lte: Number(voteAverageLteRef.current?.value || 0),
// 			vote_count_gte: Number(voteCountGteRef.current?.value || 0),
// 			vote_count_lte: Number(voteCountLteRef.current?.value || 0),
// 			with_cast: withCastRef.current?.value || '',
// 			with_crew: withCrewRef.current?.value || '',
// 			with_genres: withGenresRef.current?.value || '',
// 			with_keywords: withKeywordsRef.current?.value || '',
// 			with_people: withPeopleRef.current?.value || '',
// 			with_runtime_gte: withRuntimeGteRef.current?.value || '',
// 			with_runtime_lte: withRuntimeLteRef.current?.value || '',
// 			with_original_language: withOriginalLanguageRef.current?.value || '',
// 			without_genres: withoutGenresRef.current?.value || '',
// 			with_release_type: withReleaseTypeRef.current?.value || '',
// 			year: Number(yearRef.current?.value || 0),
// 		};
// 	};
// }
