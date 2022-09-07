import React, { PropsWithChildren, ReactNode } from 'react';

type Props = PropsWithChildren<{
	id: string;
	title?: string;
	className?: string;
}>;

export default function Section(props: Props) {
	return (
		<section id={props.id} className={`${props.className} relative mx-auto block min-h-max w-11/12 pb-20 sm:w-3/5`}>
			{props.title && <h2 className="my-8 font-head text-4xl font-bold">{props.title}</h2>}
			<div className="">{props.children}</div>
		</section>
	);
}
