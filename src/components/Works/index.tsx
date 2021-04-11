import React, { useEffect, useState } from 'react';
import Project from '../Project';

import { project } from '../types';
import './styles.scss';

export default function Works() {
	const [projects, setProjects] = useState<project[]>([]);

	useEffect(() => {
		fetch('https://projects.wouter.cloud/')
			.then(data => data.json())
			.then(json => setProjects(json));
	}, []);

	return (
		<section id="works">
			<div className="content">
				<h2>My work.</h2>
				<div className="projects">
					{projects.map(element => (
						<Project key={element.name} url={element.url} name={element.name} description={element.description} thumb={element.thumb} links={element.links} tags={element.tags} />
					))}
				</div>
			</div>
		</section>
	);
}
