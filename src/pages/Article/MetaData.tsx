//@ts-ignore

import React, { ForwardedRef, forwardRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { EyeIcon } from '@heroicons/react/solid';
import AdaptiveText from 'react-adaptive-text';
import Tag from 'components/Tag';
import Link from 'components/Link';
import { MetadataType } from 'types';

// eslint-disable-next-line react/display-name
const MetaData = forwardRef(({ metadata }: { metadata: MetadataType }, ref: ForwardedRef<HTMLHeadingElement>) => {
	return (
		<div
			className="card grid grid-cols-1 grid-rows-6 gap-2 bg-gradient-to-r from-rose-500 to-red-500 p-6 sm:grid-cols-3 sm:grid-rows-4 sm:gap-2"
			style={{ gridTemplateRows: '1fr 1fr auto auto' }}
		>
			<h1 className="AdaptiveText row-span-2 text-left font-head font-bold sm:col-start-1 sm:col-end-3 sm:row-start-1 sm:row-end-3" ref={ref}>
				<AdaptiveText width="100%" text={metadata.title} fontSizeMax={36} fontSizeMin={16} />
			</h1>
			<div className="AdaptiveText flex flex-wrap sm:col-span-3 sm:row-start-3 sm:row-end-4">
				<AdaptiveText width="100%" text={metadata.description} fontSizeMax={16} fontSizeMin={12} />
			</div>
			<ul className="flex items-center gap-2 sm:col-start-3 sm:col-end-4 sm:row-start-1 sm:row-end-3 sm:flex-row-reverse">
				<Link url={metadata.live} label="Live">
					<EyeIcon className="mr-1 inline h-5 w-5" />
				</Link>

				<Link url={metadata.github} label="Github">
					<FontAwesomeIcon icon={faGithub} className="mr-1 inline h-5 w-5" />
				</Link>
			</ul>
			<ul className="flex flex-wrap items-end overflow-hidden text-sm sm:col-start-1 sm:col-end-3  sm:row-start-4">
				{metadata.tags.map((tag) => (
					<Tag key={tag.label} label={tag.label} color={tag.color} url={tag.url} />
				))}
			</ul>
		</div>
	);
});

export default MetaData;
