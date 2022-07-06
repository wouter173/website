import create from 'zustand';
import { StoreDataType } from 'misc/types';
import { useMemo } from 'react';

const initialStoreData: StoreDataType = {
	projects: [],
};

const createStore = (preloadedData: StoreDataType) => {
	return create<StoreDataType>((set, get) => ({
		...initialStoreData,
		...preloadedData,
	}));
};

let store: ReturnType<typeof createStore> | undefined;

export const initStore = (preloadedData: StoreDataType) => {
	let _store = store ?? createStore(preloadedData);

	if (preloadedData && store) {
		_store = createStore({ ...store.getState(), ...preloadedData });
		store = undefined;
	}

	if (typeof window === 'undefined') return _store;
	if (!store) store = _store;

	return _store;
};

export const useHydrate = (initialData: StoreDataType) => {
	return useMemo(() => initStore(initialData), [initialData]);
};
