import Project from 'components/Home/Project';
import { ProjectType } from 'misc/types';
import { getApiUri } from 'misc/utils';
import Section from './Section';

export default function Work(props: { projects: ProjectType[] }) {
	if (props.projects.length > 0)
		return (
			<Section id="work" className="mt-4">
				<div className="mb-28 grid grid-flow-row gap-4 grid-cols-1 lg:grid-cols-2">
					{props.projects.map((element, i) => {
						return <Project {...element} key={element.title} thumbnail={{ url: getApiUri() + element.thumbnail.url }} outline={false} />;
					})}
				</div>
			</Section>
		);
	return <div className="h-[20vh]" />;
}
