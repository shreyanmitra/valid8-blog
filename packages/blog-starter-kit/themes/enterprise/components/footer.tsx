import { useAppContext } from './contexts/appContext';
import { PublicationFragment } from '../generated/graphql';
import { SocialLinks } from './social-links';

const getPublicationLogo = (publication: PublicationFragment) => {
	return publication.preferences.darkMode?.logo || publication.preferences.logo;
};

export const Footer = () => {
	const { publication } = useAppContext();
	const PUBLICATION_LOGO = getPublicationLogo(publication);
	const VALID8_BASE_URL = 'https://valid8code.ai';
	return (
		<footer className="border-t border-slate-800 bg-slate-950 py-12">
			<div className="container mx-auto px-4">
				<div className="mb-8 grid gap-8 md:grid-cols-4">
					{/* Brand */}
					<div className="md:col-span-2">
						<div className="mb-4 flex items-center gap-2">
							{PUBLICATION_LOGO ? (
								<a href={VALID8_BASE_URL} target="_blank" rel="noopener noreferrer" aria-label="Valid8 homepage">
									<img
										src={PUBLICATION_LOGO}
										alt={publication.title}
										className="h-8 w-auto object-contain"
									/>
								</a>
							) : (
								<a href={VALID8_BASE_URL} target="_blank" rel="noopener noreferrer" className="text-slate-50">
									{publication.title}
								</a>
							)}
						</div>
						<p className="mb-4 max-w-md text-slate-400">
							Securing your code in the new era of generative AI. Built by student researchers at the
							University of Washington&apos;s Paul G. Allen School of Computer Science &amp; Engineering.
						</p>
						<div className="flex items-center gap-3">
							<SocialLinks />
						</div>
					</div>

					{/* Product and Company - Same Row */}
					<div className="grid gap-8 md:col-span-2 md:grid-cols-2">
						{/* Product */}
						<div>
							<h4 className="mb-4 font-semibold text-slate-200">Product</h4>
							<ul className="space-y-2 text-slate-400">
								<li>
									<a
										href={`${VALID8_BASE_URL}/features`}
										target="_blank"
										rel="noopener noreferrer"
										className="transition-colors hover:text-white"
									>
										Features
									</a>
								</li>
								<li>
									<a
										href={`${VALID8_BASE_URL}/#pricing`}
										target="_blank"
										rel="noopener noreferrer"
										className="transition-colors hover:text-white"
									>
										Pricing
									</a>
								</li>
								<li>
									<a
										href={`${VALID8_BASE_URL}/docs`}
										target="_blank"
										rel="noopener noreferrer"
										className="transition-colors hover:text-white"
									>
										Documentation
									</a>
								</li>
								<li>
									<a
										href="https://github.com/shreyanmitra/valid8-releases/releases"
										target="_blank"
										rel="noopener noreferrer"
										className="transition-colors hover:text-white"
									>
										Changelog
									</a>
								</li>
							</ul>
						</div>

						{/* Company */}
						<div>
							<h4 className="mb-4 font-semibold text-slate-200">Company</h4>
							<ul className="space-y-2 text-slate-400">
								<li>
									<a
										href={`${VALID8_BASE_URL}/#team`}
										target="_blank"
										rel="noopener noreferrer"
										className="transition-colors hover:text-white"
									>
										Team
									</a>
								</li>
								<li>
									<a
										href={`${VALID8_BASE_URL}/investors`}
										target="_blank"
										rel="noopener noreferrer"
										className="transition-colors hover:text-white"
									>
										Investors
									</a>
								</li>
								<li>
									<a
										href={`${VALID8_BASE_URL}/privacy`}
										target="_blank"
										rel="noopener noreferrer"
										className="transition-colors hover:text-white"
									>
										Privacy Policy
									</a>
								</li>
								<li>
									<a
										href={`${VALID8_BASE_URL}/terms`}
										target="_blank"
										rel="noopener noreferrer"
										className="transition-colors hover:text-white"
									>
										Terms of Service
									</a>
								</li>
							</ul>
						</div>
					</div>
				</div>

				<div className="flex flex-col items-center justify-between gap-4 border-t border-slate-800 pt-8 md:flex-row">
					<p className="text-sm text-slate-400">
						© {new Date().getFullYear()} {publication.title}. All rights reserved.
					</p>
					<p className="text-sm text-slate-500">Built with ❤️ at the University of Washington</p>
				</div>
			</div>
		</footer>
	);
};
