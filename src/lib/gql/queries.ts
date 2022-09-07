import { gql } from 'urql';

const publishedCondition = '(where: { status: { equals: "published" } })';
// const publishedCondition = '';

export const projectsQuery = gql`
	query projects {
		projects${publishedCondition} {
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
		projects${publishedCondition} {
			slug
		}
	}
`;
