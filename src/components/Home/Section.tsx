import React, { ReactNode } from 'react';

type Props = {
	title: string;
	id: string;
	className?: string;
	children: ReactNode;
};

export default function Section(props: Props) {
	return (
		<section id={props.id} className={`${props.className} relative mx-auto block min-h-max w-11/12 pb-20 sm:w-3/5`}>
			<h2 className="my-8 font-head text-4xl font-bold">{props.title}</h2>
			<div className="">{props.children}</div>
		</section>
	);
}
