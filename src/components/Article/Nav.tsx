import React, { PropsWithChildren, RefObject } from 'react';
import { HeartIcon, XIcon } from '@heroicons/react/solid';
import { useScroll } from 'react-use';
import { useStore } from 'lib/state/StateProvider';
import { ProjectType } from 'misc/types';
import Link from 'next/link';

const Btn = (props: PropsWithChildren<{ className?: string; onClick?: () => void }>) => (
	<button className={(props.className ? props.className + ' ' : '') + 'h-10 w-full rounded-2xl bg-bermuda-card text-tx-sec'} onClick={props.onClick}>
		{props.children}
	</button>
);

type Props = {
	refs: {
		scrollRef: RefObject<HTMLDivElement>;
		metadataTitleRef: RefObject<HTMLHeadingElement>;
	};
	slug: string;
};

const Nav = ({ refs, slug }: Props) => {
	const project = useStore<ProjectType>((state) => state.projects.filter((project) => project.slug === slug)[0]);
	const { y } = useScroll(refs.scrollRef);

	return (
		<nav
			className={`${
				y > 60 ? 'sm:px-2' : 'sm:px-0'
			} sticky top-0 z-20 grid max-w-full gap-5 bg-bermuda bg-opacity-95 px-2 py-4 backdrop-blur-lg backdrop-filter transition-all`}
			style={{ gridTemplateColumns: '2.5rem minmax(0, 1fr) 2.5rem' }}
		>
			<Btn>
				<HeartIcon className="mx-auto h-5 w-5 text-rose-500 " />
			</Btn>
			<span
				className={`${
					y > (refs.metadataTitleRef.current?.offsetTop || 1) ? 'opacity-100' : 'opacity-0'
				} overflow-hidden text-ellipsis whitespace-nowrap text-center font-head font-bold leading-10 transition-opacity`}
			>
				{project ? project.title : ''}
			</span>
			<Link href="/#works">
				<a className="hover:text-rose-500 flex items-center h-10 w-full rounded-2xl bg-bermuda-card text-tx-sec">
					<XIcon className="mx-auto h-5 w-5 text-inherit transition-colors" />
				</a>
			</Link>
		</nav>
	);
};

export default Nav;
