import { client } from 'lib/gql/client';
import { projectsQuery } from 'lib/gql/queries';
import { StoreDataType } from 'misc/types';
import { getApiUri } from 'misc/utils';
import Vibrant from 'node-vibrant';

export const fetchProjects = async () => {
	const { data, error } = await client.query<StoreDataType>(projectsQuery).toPromise();
	if (error || data == undefined) throw error;

	for (let project of data.projects) {
		const src = getApiUri() + project.thumbnail.url;
		const palette = await Vibrant.from(src).getPalette();
		project.themeColor = palette.DarkVibrant?.hex!;
	}

	return data.projects;
};
