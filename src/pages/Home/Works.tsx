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
				{projects.length == 0 ? <span className="mt-20 text-center">Nothing to see here yet</span> : null}
				{projects.map((element, i) => {
					return <Project {...element} key={element.title} thumbnail={{ url: getApiUri() + element.thumbnail.url }} inverted={i % 2 == 1} />;
				})}
			</div>
		</Section>
	);
}
