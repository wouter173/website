import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ProjectType } from 'types';
import { client } from 'app/graphql';
import { projectsQuery } from './queries';

export const fetchProjects = createAsyncThunk('projects/fetchProjects', async (): Promise<ProjectType[]> => {
	const { data, error } = await client.query(projectsQuery.loc!.source.body).toPromise();
	if (error)
		return [
			{
				title: '',
				slug: '',
				description: '',
				thumbnail: { url: '' },
				github: '',
				live: '',
				tags: [],
				content: {},
			},
		];
	return data.projects;
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
