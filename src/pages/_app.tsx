import type { AppProps } from 'next/app';
import { StoreContextProvider } from 'lib/state/StateProvider';
import { useHydrate } from 'lib/state/store';
import { mountStoreDevtool } from 'simple-zustand-devtools';
import { MediaContextProvider } from 'components/Context/MediaContext';
import 'styles/root.scss';

function App({ Component, pageProps }: AppProps) {
	let store = useHydrate(pageProps.state);

	if (typeof window !== 'undefined') mountStoreDevtool('store', store);

	return (
		<MediaContextProvider>
			<StoreContextProvider store={store}>
				<Component {...pageProps} />
			</StoreContextProvider>
		</MediaContextProvider>
	);
}

export default App;
