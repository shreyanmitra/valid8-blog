import Link from 'next/link';
import { Container } from './container';
import { useAppContext } from './contexts/appContext';
import { SocialLinks } from './social-links';

export const Footer = () => {
	const { publication } = useAppContext();
	const PUBLICATION_LOGO = publication.preferences.logo;
	return (
		<footer className="border-t border-slate-800 bg-slate-950 py-12">
			<Container>
				<div className="grid gap-8 md:grid-cols-4 md:gap-10">
					{/* Brand */}
					<div className="md:col-span-2">
						{PUBLICATION_LOGO ? (
							<Link
								href={'/'}
								aria-label={`${publication.title} home page`}
								className="mb-4 inline-flex items-center gap-3"
							>
								<img className="block h-8 w-auto" src={PUBLICATION_LOGO} alt={publication.title} />
							</Link>
						) : (
							<Link
								href={'/'}
								aria-label={`${publication.title} home page`}
								className="mb-4 inline-flex items-center text-lg font-semibold text-slate-50"
							>
								{publication.title}
							</Link>
						)}

						<p className="max-w-md text-sm leading-relaxed text-slate-400">
							Latest updates, product notes, and engineering stories from {publication.title}.
						</p>

						<div className="mt-4">
							<SocialLinks />
						</div>
					</div>

					{/* Links */}
					<div>
						<p className="mb-4 font-semibold text-slate-200">Product</p>
						<ul className="space-y-2 text-sm text-slate-400">
							<li>
								<a href="#" className="transition-colors hover:text-white">
									Blog
								</a>
							</li>
							<li>
								<a href="#" className="transition-colors hover:text-white">
									Documentation
								</a>
							</li>
							<li>
								<a href="#" className="transition-colors hover:text-white">
									Changelog
								</a>
							</li>
						</ul>
					</div>

					<div>
						<p className="mb-4 font-semibold text-slate-200">Company</p>
						<ul className="space-y-2 text-sm text-slate-400">
							<li>
								<a href="#" className="transition-colors hover:text-white">
									About
								</a>
							</li>
							<li>
								<a href="#" className="transition-colors hover:text-white">
									Privacy Policy
								</a>
							</li>
							<li>
								<a href="#" className="transition-colors hover:text-white">
									Terms
								</a>
							</li>
						</ul>
					</div>
				</div>

				<div className="mt-10 flex flex-col gap-3 border-t border-slate-800 pt-8 text-sm text-slate-400 md:flex-row md:items-center md:justify-between">
					<p>&copy; {new Date().getFullYear()} {publication.title}. All rights reserved.</p>
					<p className="text-slate-500">Built with Headless Hashnode</p>
				</div>
			</Container>
		</footer>
	);
};
