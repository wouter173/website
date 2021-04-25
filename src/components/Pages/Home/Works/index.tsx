import React, { useContext } from 'react';
import Project from '../Project';
import ProjectsContext from '../../../Shared/Context/ProjectsContext';
import './styles.scss';

export default function Works() {
	const projects = useContext(ProjectsContext);

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
