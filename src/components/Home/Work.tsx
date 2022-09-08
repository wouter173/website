import Project from 'components/Home/Project';
import { ProjectType } from 'misc/types';
import { getApiUri } from 'misc/utils';
import Section from './Section';

export default function Work(props: { projects: ProjectType[] }) {
	if (props.projects.length > 0)
		return (
			<Section id="work" className="mt-4">
				<div className="mb-10 sm:mb-28 grid grid-flow-row gap-4 grid-cols-1 lg:grid-cols-2">
					{props.projects.map((project, i) => {
						return <Project {...project} key={project.slug} thumbnail={{ url: getApiUri() + project.thumbnail.url }} outline={false} />;
					})}
				</div>
			</Section>
		);
	return <div className="h-[20vh]" />;
}
