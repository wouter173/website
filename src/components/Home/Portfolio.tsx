import Project from 'components/Home/Project';
import { ProjectType } from 'misc/types';
import { getApiUri } from 'misc/utils';
import Section from './Section';

export default function Portfolio(props: { projects: ProjectType[] }) {
	if (props.projects.length > 0)
		return (
			<Section id="portfolio" className="mt-4">
				<div className="mb-10 sm:mb-28 grid grid-flow-row gap-4 grid-cols-1 xl:grid-cols-2">
					{props.projects.map((project) => {
						return <Project {...project} key={project.slug} thumbnail={{ url: getApiUri() + project.thumbnail.url }} outline={true} />;
					})}
				</div>
			</Section>
		);
	return <div className="h-[20vh]" />;
}
