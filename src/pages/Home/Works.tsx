import React from 'react';
import Project from 'pages/Home/Project';
import { getApiUri } from 'utils';
import { useSelector } from 'react-redux';
import { ProjectsType } from 'types';
import Section from './Section';

export default function Works() {
	const { projects } = useSelector<ProjectsType, ProjectsType>((state) => state);

	return (
		<Section title="My work" id="work">
			<div className="mb-28 grid grid-flow-row gap-20">
				{projects.map((element, i) => (
					<Project
						key={element.title}
						slug={element.slug}
						title={element.title}
						description={element.description}
						thumbnail={{ url: getApiUri() + element.thumbnail.url }}
						github={element.github}
						live={element.live}
						tags={element.tags}
						inverted={i % 2 == 1}
					/>
				))}
			</div>
		</Section>
	);
}
