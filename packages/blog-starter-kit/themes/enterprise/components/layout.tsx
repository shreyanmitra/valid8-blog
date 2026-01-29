import { Analytics } from './analytics';
import { Integrations } from './integrations';
import { Meta } from './meta';
import { Scripts } from './scripts';

type Props = {
	children: React.ReactNode;
};

export const Layout = ({ children }: Props) => {
	return (
		<>
			<Meta />
			<Scripts />
			<div className="relative min-h-screen bg-slate-950 text-slate-50">
				{/* valid8-lite style background glow + grid */}
				<div className="pointer-events-none fixed inset-0 -z-10 bg-gradient-to-br from-blue-500/10 via-transparent to-purple-500/10" />
				<div className="pointer-events-none fixed inset-0 -z-10 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]" />

				<main className="relative">{children}</main>
			</div>
			<Analytics />
			<Integrations />
		</>
	);
};
