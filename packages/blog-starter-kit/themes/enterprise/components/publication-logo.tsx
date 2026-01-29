import { resizeImage } from '@starter-kit/utils/image';
import { useAppContext } from './contexts/appContext';
import { PublicationFragment } from '../generated/graphql';

const getPublicationLogo = (publication: PublicationFragment, isSidebar?: boolean) => {
	if (isSidebar) {
		return publication.preferences.logo; // Always display light mode logo in sidebar
	}
	return publication.preferences.darkMode?.logo || publication.preferences.logo;
}

export const PublicationLogo = ({ isSidebar }: { isSidebar?: boolean }) => {
	const { publication } = useAppContext();
	const PUBLICATION_LOGO = getPublicationLogo(publication, isSidebar);
	const VALID8_BASE_URL = 'https://valid8code.ai';

	return (
		<h1 className="relative">
			<a
				href={VALID8_BASE_URL}
				target="_blank"
				rel="noopener noreferrer"
				aria-label="Valid8 homepage"
				className="flex items-center gap-2"
			>
				{PUBLICATION_LOGO ? (
					<img
						className="h-10 w-auto object-contain"
						alt={publication.title}
						src={resizeImage(PUBLICATION_LOGO, { w: 320, h: 80 })}
					/>
				) : (
					<span
						className={`block text-2xl font-semibold ${
							isSidebar ? 'text-white' : 'text-white'
						}`}
					>
						{publication.title}
					</span>
				)}
			</a>
		</h1>
	);
};
