import { StoreDataType, StoreType } from 'misc/types';
import { createContext, PropsWithChildren, useContext } from 'react';
import { EqualityChecker, StateSelector } from 'zustand';

const storeContext = createContext<StoreType | null>(null);

export const StoreContextProvider = (props: PropsWithChildren<{ store: StoreType }>) => {
	return <storeContext.Provider value={props.store}>{props.children}</storeContext.Provider>;
};

export const useStore = function <T extends object>(selector?: StateSelector<StoreDataType, T>, eqFn?: EqualityChecker<object>) {
	const store = useContext(storeContext);
	if (!store) throw new Error('useStore must be used within a StoreContextProvider');

	const values = store(selector!, eqFn);
	return values;
};
