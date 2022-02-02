import { DocumentRendererProps } from '@keystone-6/document-renderer';

export type ProjectsType = {
	projects: ProjectType[]
}

export interface ProjectType extends MetadataType, ContentType {}

export type ContentType = {
	content: {
		document?: DocumentRendererProps['document']
	}
}

export type MetadataType = {
    title: string
	slug: string
    description: string
    thumbnail: {
		url: string
	}
    github: string,
	live: string
    tags: TagType[]
}

export type TagType = {
    label: string
    color: string
    url?: string
}

export type HeroIcon = React.ComponentType<React.ComponentProps<'svg'>>;