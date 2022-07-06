import React from 'react';
import { DocumentRenderer, DocumentRendererProps } from '@keystone-6/document-renderer';
import { renderers } from './renderers';

type Props = {
	className: string;
	document: DocumentRendererProps['document'];
};

export default function index(props: Props) {
	return (
		<div className={props.className + ' h-auto w-full p-12 mb-8'}>
			<DocumentRenderer document={props.document} renderers={renderers} />
		</div>
	);
}
