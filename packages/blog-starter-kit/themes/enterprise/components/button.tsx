import { forwardRef } from 'react';

type Props = {
	label: string;
	type?: string;
	icon?: React.ReactNode;
	className?: string;
	secondaryIcon?: React.ReactNode;
	href?: string;
	onClick?: () => void;
	as?: string;
	rel?: string;
	target?: string;
};

export const Button = forwardRef<HTMLButtonElement, Props>(
	({ label, type, icon, className, secondaryIcon, href, rel, as, target, onClick }, ref) => {
		const base =
			'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md border px-4 py-2 text-sm font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500/40 disabled:pointer-events-none disabled:opacity-50';

		let variantClassName: string;

		switch (type) {
			case 'outline':
				variantClassName =
					'border-slate-700 bg-slate-800/50 text-slate-200 hover:bg-slate-700 hover:text-white';
				break;

			case 'primary':
				variantClassName = 'border-blue-600 bg-blue-600 text-white hover:bg-blue-700';
				break;

			case 'outline-dark':
				variantClassName =
					'border-slate-700 bg-transparent text-slate-200 hover:bg-slate-800 hover:text-white';
				break;

			case 'ghost':
				variantClassName =
					'border-transparent bg-transparent text-slate-300 hover:bg-slate-800/50 hover:text-white';
				break;

			default:
				variantClassName = 'border-blue-600 bg-blue-600 text-white hover:bg-blue-700';
		}

		if (as === 'a') {
			return (
				<a
					href={href}
					rel={rel}
					target={target}
					className={`${base} ${variantClassName} ${
						secondaryIcon ? `md:justify-between` : `md:justify-center`
					} ${className ?? ''}`}
				>
					<div className="flex flex-row items-center gap-2">
						{icon && <div className="shrink-0">{icon}</div>}
						{label || null}
					</div>
					{secondaryIcon && <div className="shrink-0">{secondaryIcon}</div>}
				</a>
			);
		}

		return (
			<button
				ref={ref}
				onClick={onClick}
				className={`${base} ${variantClassName} ${
					secondaryIcon ? `md:justify-between` : `md:justify-center`
				} ${className ?? ''}`}
			>
				<div className="flex flex-row items-center gap-2">
					{icon && <div className="shrink-0">{icon}</div>}
					{label || null}
				</div>
				{secondaryIcon && <div className="shrink-0">{secondaryIcon}</div>}
			</button>
		);
	},
);

Button.displayName = 'Button';
