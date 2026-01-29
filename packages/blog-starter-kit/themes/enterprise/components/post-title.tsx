import { ReactNode } from 'react';

type Props = {
	children?: ReactNode;
};

export const PostTitle = ({ children }: Props) => {
	return (
		<div className="prose mx-auto max-w-screen-lg px-4 prose-h1:text-center md:prose-xl dark:prose-invert">
			<h1 className="">{children}</h1>
		</div>
	);
};
