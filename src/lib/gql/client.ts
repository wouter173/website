import { createClient, defaultExchanges } from 'urql';
import { getApiUri } from 'misc/utils';
import { devtoolsExchange } from '@urql/devtools';

export const client = createClient({
	url: getApiUri() + '/api/graphql/',
	exchanges: [devtoolsExchange, ...defaultExchanges],
});
