import { resizeImage } from '@starter-kit/utils/image';
import Link from 'next/link';
import { DEFAULT_COVER } from '../utils/const';
import { CoverImage } from './cover-image';
import { DateFormatter } from './date-formatter';

type Props = {
	title: string;
	coverImage: string;
	date: string;
	excerpt: string;
	slug: string;
};

export const SecondaryPost = ({ title, coverImage, date, excerpt, slug }: Props) => {
	const postURL = `/${slug}`;

	return (
		<section className="grid items-start gap-5 rounded-xl border border-slate-800 bg-slate-900/40 p-4 transition-colors hover:border-blue-500/30 md:grid-cols-2 md:p-6">
			<div className="col-span-1">
				<CoverImage
					title={title}
					src={resizeImage(coverImage, { w: 1600, h: 840, c: 'thumb' }, DEFAULT_COVER)}
					slug={slug}
				/>
			</div>
			<div className="col-span-1 flex flex-col gap-2">
				<h1 className="text-lg font-semibold leading-tight text-slate-50">
					<Link
						href={postURL}
						className="transition-colors hover:text-blue-300"
					>
						{title}
					</Link>
				</h1>
				<Link href={postURL}>
					<p className="text-md leading-snug text-slate-300">
						{excerpt.length > 100 ? excerpt.substring(0, 100) + '…' : excerpt}
					</p>
				</Link>
				<div className="text-sm font-semibold text-slate-400">
					<Link href={postURL}>
						<DateFormatter dateString={date} />
					</Link>
				</div>
			</div>
		</section>
	);
};
