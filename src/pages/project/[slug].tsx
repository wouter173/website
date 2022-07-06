import { client } from 'lib/gql/client';
import { projectSlugsQuery, projectsQuery } from 'lib/gql/queries';
import { useStore } from 'lib/state/StateProvider';
import { ProjectType, StoreDataType } from 'misc/types';
import { useRouter } from 'next/router';
import { useRef } from 'react';

import Content from 'components/Article/Content';
import MetaData from 'components/Article/MetaData';
import Nav from 'components/Article/Nav';
import { getApiUri } from 'misc/utils';

export default function Project() {
	const router = useRouter();
	const { slug } = router.query;

	let id;
	if (Array.isArray(slug)) id = slug[0];
	else id = slug || '';

	const project = useStore<ProjectType>((state) => state.projects.filter((project) => project.slug === slug)[0]);

	const scrollRef = useRef(null);
	const metadataTitleRef = useRef(null);

	return (
		<div id="Article" className="max-h-screen overflow-auto bg-bermuda" ref={scrollRef}>
			<div className="mx-auto mt-8 grid w-11/12 grid-flow-row gap-10 sm:mx-auto sm:w-1/2 sm:px-0">
				<Nav refs={{ scrollRef, metadataTitleRef }} slug={id} />
				<div
					className="card h-96 bg-bermuda-card bg-cover bg-center"
					style={{ backgroundImage: `url(${getApiUri()}${project.thumbnail.url ?? ''})` }}
				/>
				<MetaData metadata={project} ref={metadataTitleRef} />
				<Content className="card" document={project.content.document ?? []} />
			</div>
		</div>
	);
}

export const getStaticProps = async () => {
	const { data, error } = await client.query(projectsQuery).toPromise();
	if (error) throw error;

	return {
		props: {
			state: data as StoreDataType,
		},
	};
};

export const getStaticPaths = async () => {
	const { data, error } = await client.query(projectSlugsQuery).toPromise();
	if (error) throw error;

	return {
		paths: data.projects.map((project: any) => ({ params: { slug: project.slug } })),
		fallback: true,
	};
};
