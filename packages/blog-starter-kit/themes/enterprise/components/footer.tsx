import Link from 'next/link';
import { useAppContext } from './contexts/appContext';
import { SocialLinks } from './social-links';

export const Footer = () => {
	const { publication } = useAppContext();
	const PUBLICATION_LOGO = publication.preferences.logo;
	return (
		<footer className="border-t border-slate-800 bg-slate-950 py-12">
			<div className="container mx-auto px-4">
				<div className="mb-8 grid gap-8 md:grid-cols-4">
					{/* Brand */}
					<div className="md:col-span-2">
						<div className="mb-4 flex items-center gap-2">
							{PUBLICATION_LOGO ? (
								<img
									src={PUBLICATION_LOGO}
									alt={publication.title}
									className="h-8 w-auto object-contain"
								/>
							) : (
								<Link href={'/'} className="text-slate-50">
									{publication.title}
								</Link>
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
									<Link href="/features" className="transition-colors hover:text-white">
										Features
									</Link>
								</li>
								<li>
									<Link href="/#pricing" className="transition-colors hover:text-white">
										Pricing
									</Link>
								</li>
								<li>
									<Link href="/docs" className="transition-colors hover:text-white">
										Documentation
									</Link>
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
									<Link href="/#team" className="transition-colors hover:text-white">
										Team
									</Link>
								</li>
								<li>
									<Link href="/investors" className="transition-colors hover:text-white">
										Investors
									</Link>
								</li>
								<li>
									<Link href="/privacy" className="transition-colors hover:text-white">
										Privacy Policy
									</Link>
								</li>
								<li>
									<Link href="/terms" className="transition-colors hover:text-white">
										Terms of Service
									</Link>
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
