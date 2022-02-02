import React, { PropsWithChildren, RefObject } from 'react';
import { ChevronRightIcon, HeartIcon, XIcon } from '@heroicons/react/solid';
import { useScroll } from 'react-use';
import { useSelector } from 'react-redux';
import { ChevronLeftIcon } from '@heroicons/react/solid';
import { ProjectsType, ProjectType } from 'types';
import { useHistory } from 'react-router-dom';

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
	const project = useSelector<ProjectsType, ProjectType | null>((state) => state.projects.find((project) => project.slug == slug) || null);
	const history = useHistory();
	const { y } = useScroll(refs.scrollRef);

	return (
		<nav
			className={`${
				y > 60 ? 'sm:px-2' : 'sm:px-0'
			} sticky top-0 z-20 grid max-w-full gap-5 bg-bermuda bg-opacity-95 px-2 py-4 backdrop-blur-lg backdrop-filter transition-all`}
			style={{ gridTemplateColumns: '2.5rem minmax(0, 1fr) 2.5rem' }}
		>
			<Btn>
				{/* //TODO add like functionality */}
				<HeartIcon className="mx-auto h-5 w-5 text-rose-500 " />
			</Btn>
			{/* //TODO add next button at the bottom of the page */}
			{/* <Btn className="hover:text-rose-500">
				<ChevronLeftIcon className="mx-auto h-5 w-5 text-inherit transition-colors" />
			</Btn> */}
			<span
				className={`${
					y > (refs.metadataTitleRef.current?.offsetTop || 1) ? 'opacity-100' : 'opacity-0'
				} overflow-hidden text-ellipsis whitespace-nowrap text-center font-head font-bold leading-10 transition-opacity`}
			>
				{project ? project.title : ''}
			</span>
			{/* <Btn className="hover:text-rose-500">
				<ChevronRightIcon className="mx-auto h-5 w-5 text-inherit transition-colors" />
			</Btn> */}
			<Btn className="hover:text-rose-500" onClick={() => history.push('/#work')}>
				<XIcon className="mx-auto h-5 w-5 text-inherit transition-colors" />
			</Btn>
		</nav>
	);
};

export default Nav;