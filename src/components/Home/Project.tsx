import React, { useRef } from 'react';
import { DocumentTextIcon, EyeIcon } from '@heroicons/react/solid';
import GithubIcon from 'components/icons/GithubIcon';

import { MetadataType } from 'misc/types';
import Tag from 'components/Tag';
import ExternalLink from 'components/ExternalLink';
import Link from 'next/link';

export default function Project(props: MetadataType & { inverted: boolean }) {
	const projectRef = useRef<HTMLDivElement>(null);

	return (
		<article
			className="card grid min-h-max w-full grid-cols-2 grid-rows-2 overflow-hidden sm:h-[23rem]"
			ref={projectRef}
			style={{ gridTemplateRows: '1fr, 1fr' }}
		>
			<div
				className={`${
					props.inverted ? 'sm:col-start-2 sm:col-end-3' : 'sm:col-start-1 sm:col-end-2'
				} col-start-1 col-end-3 row-start-1 row-end-2 bg-cover bg-center sm:row-end-3`}
				style={{ backgroundImage: `url("${props.thumbnail.url}")` }}
			></div>
			<div className="col-span-2 grid h-full gap-2 p-12 sm:col-span-1 sm:row-span-2">
				<div>
					<h3 className="my-2 font-head text-4xl font-bold sm:text-3xl">{props.title}</h3>
					<p className="pb-4">{props.description}</p>
				</div>
				<div>
					{props.slug && (
						<Link href={'/project/' + props.slug} className="text-lg sm:text-base">
							<a className="flex items-center font-bold">
								<DocumentTextIcon className="h-5 w-5" />
								Read more...
							</a>
						</Link>
					)}

					<ul className="flex">
						{props.github && (
							<li>
								<ExternalLink url={props.github} label="Github" className="text-base">
									<GithubIcon className="fill-white mr-1 h-5 w-5" />
								</ExternalLink>
							</li>
						)}

						{props.github != '' && props.live != '' && <div className="w-5 text-center">{'|'}</div>}

						<li>
							<ExternalLink url={props.live} label="Live" className="text-base">
								<EyeIcon className="mr-1 h-5 w-5" />
							</ExternalLink>
						</li>
					</ul>
				</div>

				<ul className="mt-auto flex h-min flex-wrap-reverse justify-items-end">
					{props.tags?.map((item) => (
						<Tag key={item.label} label={item.label} color={item.color} url={item.url} />
					))}
				</ul>
			</div>
		</article>
	);
}
