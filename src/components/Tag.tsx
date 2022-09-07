import { TagType } from 'misc/types';

export default function Tag(props: TagType) {
	return (
		<li className="cursor-pointer mr-1">
			<a
				className="flex items-center bg-black bg-opacity-40 p-1 pr-3 pl-2 rounded-full text-white hover:no-underline"
				href={props.url}
				rel="noreferrer"
				target="_blank"
			>
				<div className="mr-1 h-2 aspect-square rounded-full" style={{ backgroundColor: props.color }} />
				<span className="font-body font-bold text-xs">{props.label}</span>
			</a>
		</li>
	);
}
