import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faEye, faFileAlt } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import Link from '../Link';
import Tag, {TagProps} from '../Tag';
import { links } from '../types';
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
	return (
		<article className={'project'}>
			<div className="thumb" style={{backgroundImage: `url("${props.thumb}")`}}></div>
			<div className="details">
				<h3>{props.name}</h3>
				<p>{props.description}</p>

				{ props.url && <span className="read">
					<Link router url={'/project/' + props.url} icon={faFileAlt}>Read more...</Link>
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
