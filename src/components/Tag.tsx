import { TagType } from 'misc/types';

export default function Tag(props: TagType) {
	return (
		<li className="cursor-pointer mr-1">
			<a
				className="flex items-center bg-white bg-opacity-20 p-0.5 px-2.5 rounded-full text-white text-sm hover:no-underline"
				href={props.url}
				rel="noreferrer"
				target="_blank"
			>
				<span className="mr-1 text-base" style={{ color: props.color }}>
					●
				</span>
				{props.label}
			</a>
		</li>
	);
}
