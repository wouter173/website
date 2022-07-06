import { gql } from 'urql';

export const projectsQuery = gql`
	query projects {
		projects(where: { status: { equals: "published" } }) {
			title
			slug
			description
			thumbnail {
				url
			}
			github
			live
			tags {
				label
				color
				url
			}
			content {
				document(hydrateRelationships: true)
			}
		}
	}
`;

export const projectSlugsQuery = gql`
	query projects {
		projects(where: { status: { equals: "published" } }) {
			slug
		}
	}
`;
