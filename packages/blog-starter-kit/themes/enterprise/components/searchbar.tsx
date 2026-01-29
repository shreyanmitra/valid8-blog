import { resizeImage } from '@starter-kit/utils/image';
import request from 'graphql-request';
import Link from 'next/link';
import { KeyboardEventHandler, useEffect, useRef, useState } from 'react';
import {
	SearchPostsOfPublicationDocument,
	SearchPostsOfPublicationQuery,
	SearchPostsOfPublicationQueryVariables,
} from '../generated/graphql';
import { DEFAULT_COVER } from '../utils/const';
import { useAppContext } from './contexts/appContext';
import { CoverImage } from './cover-image';

const GQL_ENDPOINT = process.env.NEXT_PUBLIC_HASHNODE_GQL_ENDPOINT;
const NO_OF_SEARCH_RESULTS = 5;

type Post = SearchPostsOfPublicationQuery['searchPostsOfPublication']['edges'][0]['node'];

export const Search = () => {
	const { publication } = useAppContext();

	const searchInputRef = useRef<HTMLInputElement>(null);
	const timerRef = useRef<NodeJS.Timeout | null>(null);

	const [query, setQuery] = useState('');
	const [searchResults, setSearchResults] = useState<Post[]>([]);
	const [isSearching, setIsSearching] = useState(false);

	const resetInput = () => {
		if (!searchInputRef.current) return;
		searchInputRef.current.value = '';
		setQuery('');
	};

	const escapeSearchOnESC: KeyboardEventHandler<HTMLInputElement> = (e) => {
		if (e.key === 'Escape') {
			resetInput();
		}
	};

	const updateSearchQuery = () => {
		setQuery(searchInputRef.current?.value || '');
	};

	const search = async (query: string) => {
		if (timerRef.current) clearTimeout(timerRef.current);

		if (!query) {
			setSearchResults([]);
			setIsSearching(false);
			return;
		}

		timerRef.current = setTimeout(async () => {
			setIsSearching(true);

			const data = await request<
				SearchPostsOfPublicationQuery,
				SearchPostsOfPublicationQueryVariables
			>(GQL_ENDPOINT, SearchPostsOfPublicationDocument, {
				first: NO_OF_SEARCH_RESULTS,
				filter: { query, publicationId: publication.id },
			});
			const posts = data.searchPostsOfPublication.edges.map((edge) => edge.node);
			setSearchResults(posts);
			setIsSearching(false);
		}, 500);
	};

	useEffect(() => {
		search(query);
	}, [query]);

	const searchResultsList = searchResults.map((post) => {
		const postURL = `/${post.slug}`;
		return (
			<Link
				key={post.id}
				href={postURL}
				className="flex flex-row items-center gap-5 rounded-md px-4 py-2 transition-colors hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
			>
				<div className="flex flex-col gap-1">
					<strong className="text-base">{post.title}</strong>
					<span className="text-slate-300">
						{post.brief.length > 140 ? post.brief.substring(0, 140) + '…' : post.brief}
					</span>
				</div>
				<div className="w-56">
					<CoverImage
						title={post.title}
						src={resizeImage(
							post.coverImage?.url,
							{
								w: 400,
								h: 210,
								c: 'thumb',
							},
							DEFAULT_COVER,
						)}
					/>
				</div>
			</Link>
		);
	});

	return (
		<div className="relative col-span-1">
			<input
				type="text"
				ref={searchInputRef}
				onKeyUp={escapeSearchOnESC}
				onChange={updateSearchQuery}
				placeholder="Search blog posts…"
				className="w-full rounded-md border border-slate-700 bg-slate-900 px-4 py-2 text-base text-slate-50 placeholder:text-slate-500 transition-colors hover:bg-slate-950 focus:bg-slate-950 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
			/>
			{query && (
				<>
					{isSearching && (
						<div className="top-100 absolute left-0 z-10 mt-2 flex w-full flex-col items-stretch overflow-hidden rounded-lg border border-slate-700 bg-slate-900 p-1 text-left text-slate-50 shadow-2xl">
							<div className="flex animate-pulse flex-col gap-1 p-4">
								<div className="h-8 w-full rounded-lg bg-slate-800"></div>
								<div className="h-4 w-full rounded-lg bg-slate-800"></div>
								<div className="h-4 w-2/3 rounded-lg bg-slate-800"></div>
							</div>
							<div className="flex animate-pulse flex-col gap-1 p-4">
								<div className="h-8 w-full rounded-lg bg-slate-800"></div>
								<div className="h-4 w-full rounded-lg bg-slate-800"></div>
								<div className="h-4 w-2/3 rounded-lg bg-slate-800"></div>
							</div>
							<div className="flex animate-pulse flex-col gap-1 p-4">
								<div className="h-8 w-full rounded-lg bg-slate-800"></div>
								<div className="h-4 w-full rounded-lg bg-slate-800"></div>
								<div className="h-4 w-2/3 rounded-lg bg-slate-800"></div>
							</div>
						</div>
					)}
					{searchResults.length > 0 && !isSearching && (
						<div className="top-100 absolute left-0 z-10 mt-2 flex w-full flex-col items-stretch overflow-hidden rounded-lg border border-slate-700 bg-slate-900 p-1 text-left text-slate-50 shadow-2xl">
							<h3 className="px-4 py-2 font-medium text-slate-400">
								Found {searchResults.length} results
							</h3>
							<hr className="border-slate-800" />
							{searchResultsList}
						</div>
					)}
				</>
			)}
		</div>
	);
};
