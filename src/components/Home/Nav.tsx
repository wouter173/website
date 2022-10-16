import MediaContext from 'components/Context/MediaContext';
import React, { RefObject, useContext, useEffect, useState } from 'react';
import { useScroll } from 'react-use';

const Scroller = (props: { label: string; target: string; pageRef: RefObject<HTMLDivElement> }) => {
	const { y } = useScroll(props.pageRef);
	const [target, setTarget] = useState<HTMLElement | null>(null);

	useEffect(() => {
		setTarget(document.getElementById(props.target));
	}, []);

	const onClick = () => {
		props.pageRef.current?.scrollTo({ top: target?.offsetTop!, behavior: 'smooth' });
	};

	const inRange = () => y >= target?.offsetTop! && y <= target?.offsetTop! + target?.clientHeight!;
	return (
		<span onClick={onClick} className={`font-bold ${inRange() ? 'underline' : ''} underline-offset-1 hover:cursor-pointer hover:underline`}>
			{props.label}
		</span>
	);
};

export default function Nav({ pageRef }: { pageRef: RefObject<HTMLDivElement> }) {
	return (
		<nav id="homepage" className="hidden sm:block fixed right-20 top-14 z-10">
			<ul className="flex flex-row gap-4">
				<li>
					<Scroller target="work" label="work" pageRef={pageRef} />
				</li>
				<li>
					<Scroller target="contact" label="contact" pageRef={pageRef} />
				</li>
			</ul>
		</nav>
	);
}
