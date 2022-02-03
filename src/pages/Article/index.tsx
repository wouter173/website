import React, { useRef } from 'react';
import { useSelector } from 'react-redux';
import { RouteComponentProps, useHistory } from 'react-router-dom';
import { ProjectsType, ProjectType } from 'types';
import { getApiUri } from 'utils';
import Content from './Content';
import MetaData from './MetaData';
import Nav from './Nav';

type Props = {
	routeProps: RouteComponentProps<{ slug: string }>;
};

export default function Article(props: Props) {
	const slug = props.routeProps.match!.params.slug;
	const history = useHistory();
	const projectRaw = useSelector<ProjectsType, ProjectType | null>((state) => state.projects.find((project) => project.slug == slug) ?? null);
	if (projectRaw == null) {
		history.push('/#works');
	}
	const project = projectRaw as ProjectType;
	const apiURI = getApiUri();

	const scrollRef = useRef<HTMLDivElement>(null);
	const metadataTitleRef = useRef<HTMLHeadingElement>(null);

	return (
		<div id="Article" className="max-h-screen overflow-auto bg-bermuda" ref={scrollRef}>
			<div className="mx-auto mt-8 grid w-11/12 grid-flow-row gap-10 sm:mx-auto sm:w-1/2 sm:px-0">
				<Nav refs={{ scrollRef, metadataTitleRef }} slug={slug} />
				<div className="card h-96 bg-bermuda-card bg-cover bg-center" style={{ backgroundImage: `url(${apiURI}${project.thumbnail.url ?? ''})` }} />
				<MetaData metadata={project} ref={metadataTitleRef} />
				<Content className="card" document={project.content.document ?? []} />
			</div>
		</div>
	);
}
