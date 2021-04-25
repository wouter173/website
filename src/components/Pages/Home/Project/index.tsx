import React, { useRef, useState } from 'react';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faEye, faFileAlt } from '@fortawesome/free-solid-svg-icons';

import Tag, {TagProps} from '../../../Shared/Tag';

import Link from '../../../Shared/Link';
import { links } from '../../../Shared/types';

import './styles.scss';

type Props = {
	url: string;
	name: string;
	thumb: string;
	description: string;
	links: links;
	tags?: TagProps[];
}

export default function Project(props: Props) {
	const projectRef = useRef<HTMLDivElement>(null);
	const [animating, setAnimating] = useState<Boolean>(false);

	const animate = (): Promise<void> => {
		const root: HTMLDivElement = document.querySelector('#root')!;
		const works: HTMLDivElement = document.querySelector('#works')!; 

		return new Promise((res) => {
			setTimeout(() => res(), 750);

			setAnimating(true);

			root!.scrollTo({
				top: projectRef.current!.offsetTop + works.offsetTop - 100,
				behavior: 'smooth',
			});
		});
	};

	return (
		<article className={`project ${animating? 'animating': ''}`} ref={projectRef}>
			<div className={`thumb ${animating? 'animating': ''}`} style={{backgroundImage: `url("${props.thumb}")`}}></div>
			<div className={`details ${animating? 'animating': ''}`}>
				<h2>{props.name}</h2>
				<p>{props.description}</p>

				{ props.url && <span className="read">
					<Link animate={animate} url={'/project/' + props.url} icon={faFileAlt}>Read more...</Link>
				</span> }

				<ul className="links">
					{ props.links.github && <li>
						<Link url={props.links.github} icon={faGithub}>github</Link>
					</li> }

					{ props.links.live && <li>
						<Link url={props.links.live} icon={faEye}>live</Link>
					</li> }
				</ul>

				<ul className="tags">
					{props.tags?.map(item => 
						<Tag key={item.name} name={item.name} color={item.color} url={item.url} />
					)}
				</ul>	
			</div>
		</article>
	);
}
