import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { useState } from 'react';
import { PublicationNavbarItem } from '../generated/graphql';
import { Button } from './button';
import { Container } from './container';
import { useAppContext } from './contexts/appContext';
import HamburgerSVG from './icons/svgs/HamburgerSVG';
import { PublicationLogo } from './publication-logo';
import PublicationSidebar from './sidebar';

function hasUrl(
	navbarItem: PublicationNavbarItem,
): navbarItem is PublicationNavbarItem & { url: string } {
	return !!navbarItem.url && navbarItem.url.length > 0;
}

export const Header = () => {
	const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || '/';
	const [isSidebarVisible, setIsSidebarVisible] = useState<boolean>();
	const { publication } = useAppContext();
	const navbarItems = publication.preferences.navbarItems.filter(hasUrl);
	const visibleItems = navbarItems.slice(0, 3);
	const hiddenItems = navbarItems.slice(3);

	const toggleSidebar = () => {
		setIsSidebarVisible((prevVisibility) => !prevVisibility);
	};

	const navList = (
		<ul className="flex flex-row items-center gap-1">
			{visibleItems.map((item) => (
				<li key={item.url}>
					<a
						href={item.url}
						target="_blank"
						rel="noopener noreferrer"
						className="block max-w-[200px] truncate text-ellipsis whitespace-nowrap rounded-md px-3 py-2 text-sm font-medium text-slate-300 transition-colors hover:bg-slate-800/50 hover:text-white"
					>
						{item.label}
					</a>
				</li>
			))}

			{hiddenItems.length > 0 && (
				<li>
					<DropdownMenu.Root>
						<DropdownMenu.Trigger asChild>
							<button className="rounded-md px-3 py-2 text-sm font-medium text-slate-300 transition-colors hover:bg-slate-800/50 hover:text-white">
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
			<nav className="fixed top-0 z-50 w-full border-b border-slate-800 bg-slate-900/50 backdrop-blur">
				<Container className="flex h-16 items-center justify-between">
					<div className="flex items-center gap-2">
						<div className="lg:hidden">
							<Button
								type="ghost"
								label=""
								icon={<HamburgerSVG className="h-5 w-5 stroke-current" />}
								className="!px-3 !py-2"
								onClick={toggleSidebar}
							/>

							{isSidebarVisible && (
								<PublicationSidebar navbarItems={navbarItems} toggleSidebar={toggleSidebar} />
							)}
						</div>
						<PublicationLogo />
					</div>

					<div className="flex items-center gap-3">
						<nav className="hidden lg:block">{navList}</nav>
						<Button href={baseUrl} as="a" type="primary" label="Book a demo" />
					</div>
				</Container>
			</nav>
			{/* Spacer for fixed nav */}
			<div className="h-16" />
		</>
	);
};
