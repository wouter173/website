import { ReactNode } from 'react';

type Props = {
	url: string;
	label?: string;
	className?: string;
	children?: ReactNode;
};

const Link = (props: Props) => {
	const className = `${props.className} flex items-center text-sm cursor-pointer sm:text-base`;
	return (
		<a href={props.url} rel="noreferrer" target="_blank" className={className}>
			{props.children}
			{props.label ? <span>{props.label}</span> : <></>}
		</a>
	);
};

export default Link;
