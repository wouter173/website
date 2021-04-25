import React, { useContext, useEffect, useState } from 'react';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faEye, faTimes } from '@fortawesome/free-solid-svg-icons';
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter';
import ReactMarkdown from 'react-markdown';
import { useHistory } from 'react-router';
import Link from '../../../Shared/Link';
import Tag from '../../../Shared/Tag';
import { project as projectType } from '../../../Shared/types';
import './styles.scss';
import ProjectsContext from '../../../Shared/Context/ProjectsContext';

type Props = {
	id: string;
}

const renderers = {
	// eslint-disable-next-line react/display-name
	code: ({language, value}: {language: string, value: string}) => (
		// eslint-disable-next-line react/no-children-prop
		<SyntaxHighlighter showLineNumbers language={language} children={value} />
	),
};


export default function Card(props: Props) {
	const endpoint = `https://projects.wouter.cloud/${props.id}`;

	const projects = useContext(ProjectsContext);
	const [meta, setMeta] = useState<projectType>();
	const [body, setBody] = useState<string>('');

	const history = useHistory();

	useEffect(() => {	
		fetch(endpoint)
			.then(data => {if (data.status != 200) history.push('/'); return data.text();})
			.then(text => setBody(text));
	}, []);

	useEffect(() => {
		setMeta(projects.filter((val) => val.url === props.id)[0]);
	}, [projects]);

	return (
		<main>
			<div className="close">
				<Link router url="/" icon={faTimes} />
			</div>

			{console.log(meta?.thumb)}
			<div className="thumb" style={{backgroundImage: `url("${meta?.thumb}")`}}></div>
			<div className="details">
				<h1>{meta?.name}</h1>

				<ul className="tags">
					{meta?.tags.map(el => (
						<Tag key={el.name} name={el.name} color={el.color} url={el.url} />
					))}
				</ul>
				<ul className="links">
					{meta?.links.github && <li>
						<Link url={meta?.links.github} icon={faGithub}>github</Link>
					</li>}
					
					{meta?.links.live && <li>
						<Link url={meta?.links.live} icon={faEye}>live</Link>
					</li>}
				</ul>
			</div>
			<ReactMarkdown className="markdown" renderers={renderers}>{body}</ReactMarkdown>
		</main>
	);
}
