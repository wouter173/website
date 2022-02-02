import { configureStore } from '@reduxjs/toolkit';
import projectsSlice from './slices/projects';

export const store = configureStore({
	reducer: {
		projects: projectsSlice,
	}
});