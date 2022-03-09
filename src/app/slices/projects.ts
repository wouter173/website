import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ProjectType } from 'types';
import { client } from 'app/graphql';
import { projectsQuery } from './queries';
import Vibrant from 'node-vibrant/lib/bundle';
import { getApiUri } from 'utils';

export const fetchProjects = createAsyncThunk('projects/fetchProjects', async (): Promise<ProjectType[]> => {
	const { data, error } = await client.query(projectsQuery.loc!.source.body).toPromise();
	if (error) return [];

	const apiURI = getApiUri();

	const projects: Promise<ProjectType>[] = data.projects.map(async (project: ProjectType) => {
		const src = apiURI + data.projects[0].thumbnail.url;
		const palette = await Vibrant.from(src).getPalette();
		return { ...project, themeColor: palette.DarkVibrant?.hex };
	});

	return await Promise.all(projects);
});

const initialState: ProjectType[] = [];

const projectsSlice = createSlice({
	name: 'projects',
	initialState,
	reducers: {},
	extraReducers(builder) {
		builder.addCase(fetchProjects.fulfilled, (_, action) => {
			return action.payload;
		});
	},
});

export default projectsSlice.reducer;
