import * as DialogPrimitive from '@radix-ui/react-dialog';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { PublicationNavbarItem } from '../generated/graphql';
import { Button } from './button';
import { useAppContext } from './contexts/appContext';
import CloseSVG from './icons/svgs/CloseSVG';
import { PublicationLogo } from './publication-logo';
import { SocialLinks } from './social-links';

type Props = {
	toggleSidebar: () => void;
	navbarItems: (PublicationNavbarItem & { url: string })[];
};

function PublicationSidebar(props: Props) {
	const { toggleSidebar, navbarItems } = props;
	const [isMounted, setIsMounted] = useState(false);
	const { publication } = useAppContext();
	const hasSocialLinks = !Object.values(publication.links!).every((val) => val === '');

	useEffect(() => {
		setIsMounted(true);
	}, []);

	return (
		<DialogPrimitive.Root open>
			<DialogPrimitive.Portal>
				<DialogPrimitive.Overlay
					className={`fixed inset-0 z-50 bg-slate-900 opacity-0 transition-opacity duration-300 ease-out ${
						isMounted && 'opacity-50'
					}`}
				/>
				<DialogPrimitive.Content
					onEscapeKeyDown={() => {
						toggleSidebar();
					}}
					onPointerDownOutside={() => {
						toggleSidebar();
					}}
					className={`${
						// When the sheet is mounted, we want to slide it in from the left.
						!isMounted ? '-translate-x-96' : 'translate-x-0'
					} fixed bottom-0 left-0 top-0 z-50 flex w-80 transform flex-col border-r border-slate-800 bg-slate-950 shadow-2xl duration-300 ease-out`}
				>
					<div className="blog-sidebar-header w-full shrink-0 py-6">
						<div className="flex items-center justify-between pl-8 pr-4">
							<div className="!text-xl">
								<PublicationLogo isSidebar />
							</div>

							<DialogPrimitive.Close asChild>
								<Button
									type="ghost"
									label=""
									icon={<CloseSVG className="h-5 w-5 fill-current" />}
									className="!px-3 !py-2"
									onClick={() => {
										toggleSidebar();
									}}
								/>
							</DialogPrimitive.Close>
						</div>
					</div>

					<div className="py-10 pl-8 pr-4">
						<h2 className="mb-4 text-sm font-semibold uppercase text-slate-400">
							Blog menu
						</h2>
						<section className="mb-10">
							<ul className="flex flex-col gap-2 text-white">
								<li>
									<Link
										href="/"
										className="block truncate text-ellipsis whitespace-nowrap rounded-md px-3 py-2 text-sm font-medium text-slate-200 transition-colors hover:bg-slate-800"
									>
										Home
									</Link>
								</li>
								{navbarItems.map((item) => (
									<li key={item.url}>
										<Link
											href={item.url}
											className="block truncate text-ellipsis whitespace-nowrap rounded-md px-3 py-2 text-sm font-medium text-slate-200 transition-colors hover:bg-slate-800"
										>
											{item.label}
										</Link>
									</li>
								))}
							</ul>
						</section>

						{hasSocialLinks && (
							<h2 className="mb-4 text-sm font-semibold uppercase leading-6 text-slate-400">
								Blog socials
							</h2>
						)}
						<SocialLinks isSidebar />
					</div>
				</DialogPrimitive.Content>
			</DialogPrimitive.Portal>
		</DialogPrimitive.Root>
	);
}

export default PublicationSidebar;
