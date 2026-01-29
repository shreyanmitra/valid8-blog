import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { useState } from 'react';
import Link from 'next/link';
import { PublicationNavbarItem } from '../generated/graphql';
import { Container } from './container';
import { useAppContext } from './contexts/appContext';
import { PublicationLogo } from './publication-logo';

function hasUrl(
	navbarItem: PublicationNavbarItem,
): navbarItem is PublicationNavbarItem & { url: string } {
	return !!navbarItem.url && navbarItem.url.length > 0;
}

export const Header = () => {
	const { publication } = useAppContext();
	const navbarItems = publication.preferences.navbarItems.filter(hasUrl);
	const visibleItems = navbarItems.slice(0, 6);
	const hiddenItems = navbarItems.slice(3);

	const navList = (
		<ul className="flex flex-row items-center gap-4">
			{visibleItems.map((item) => (
				<li key={item.url}>
					<a
						href={item.url}
						target="_blank"
						rel="noopener noreferrer"
						className="text-slate-300 hover:text-white"
					>
						{item.label}
					</a>
				</li>
			))}

			{hiddenItems.length > 0 && visibleItems.length === 3 && (
				<li>
					<DropdownMenu.Root>
						<DropdownMenu.Trigger asChild>
							<button className="text-slate-300 hover:text-white">
								More
							</button>
						</DropdownMenu.Trigger>

						<DropdownMenu.Portal>
							<DropdownMenu.Content
								className="w-56 overflow-hidden rounded-md border border-slate-700 bg-slate-900 text-slate-50 shadow-xl"
								align="end"
								sideOffset={5}
							>
								{hiddenItems.map((item) => (
									<DropdownMenu.Item asChild key={item.url}>
										<a
											href={item.url}
											target="_blank"
											rel="noopener noreferrer"
											className="block truncate px-4 py-2 text-sm font-medium text-slate-200 transition-colors hover:bg-slate-800"
										>
											{item.label}
										</a>
									</DropdownMenu.Item>
								))}
							</DropdownMenu.Content>
						</DropdownMenu.Portal>
					</DropdownMenu.Root>
				</li>
			)}
		</ul>
	);

	return (
		<>
			{/* Navigation (match LandingPage.tsx) */}
			<nav className="fixed top-0 z-50 w-full border-b border-slate-800 bg-slate-900/50 backdrop-blur">
				<Container className="">
					<div className="flex h-16 items-center justify-between">
						<div className="flex items-center gap-2">
							<PublicationLogo />
						</div>

						<div className="hidden items-center gap-4 md:flex">
							<nav>{navList}</nav>
							<Link
								href={process.env.NEXT_PUBLIC_BASE_URL || '/'}
								className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md border border-blue-600 bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
							>
								Book a demo
							</Link>
						</div>
					</div>
				</Container>
			</nav>

			{/* Spacer for fixed nav */}
			<div className="h-16" />

			{/* UW Banner (match LandingPage.tsx) */}
			<div className="border-b border-purple-500/30 bg-gradient-to-r from-purple-600/20 via-blue-600/20 to-purple-600/20">
				<div className="container mx-auto px-4 py-3">
					<div className="flex items-center justify-center gap-2 text-center">
						<span className="text-sm text-slate-200">
							A state-of-the-art App Sec tool currently being offered for free through beta by the{' '}
							<span className="font-semibold text-purple-300">University of Washington</span>
						</span>
					</div>
				</div>
			</div>
		</>
	);
};
