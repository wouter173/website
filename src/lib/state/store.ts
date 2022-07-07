import create from 'zustand';
import { StoreDataType } from 'misc/types';
import { useMemo } from 'react';

const initialStoreData: StoreDataType = {
	projects: [],
};

const createStore = (preloadedData: StoreDataType) => {
	return create<StoreDataType>(() => ({
		...initialStoreData,
		...preloadedData,
	}));
};

let store: ReturnType<typeof createStore> | undefined;

export const initStore = (preloadedData: StoreDataType) => {
	let oldState = {};

	if (store) {
		oldState = store.getState();
	}

	store = createStore({ ...oldState, ...preloadedData });
	return store;
};

export const useHydrate = (initialData: StoreDataType) => {
	return useMemo(() => initStore(initialData), [initialData]);
};
