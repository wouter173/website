import { DocumentRendererProps } from '@keystone-6/document-renderer';
import { initStore } from 'lib/state/store';

export type StoreType = ReturnType<typeof initStore>;

export type StoreDataType = {
	projects: ProjectType[];
};

export interface ProjectType extends MetadataType, ContentType {}

export type ContentType = {
	content: {
		document?: DocumentRendererProps['document'];
	};
};

export type MetadataType = {
	title: string;
	slug: string;
	description: string;
	thumbnail: {
		url: string;
	};
	github: string;
	live: string;
	tags: TagType[];
	themeColor: string;
};

export type TagType = {
	label: string;
	color: string;
	url?: string;
};

export type HeroIcon = React.ComponentType<React.ComponentProps<'svg'>>;
