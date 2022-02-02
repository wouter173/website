import React, { useRef } from 'react';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

import { MetadataType } from 'types';
import Tag from 'components/Tag';
import Link from 'components/Link';
import { DocumentTextIcon, EyeIcon } from '@heroicons/react/solid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useHistory } from 'react-router-dom';

export default function Project(props: MetadataType & { inverted: boolean }) {
	const projectRef = useRef<HTMLDivElement>(null);
	const history = useHistory();

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
						<span className="font-bold">
							<Link
								url={'/project/' + props.slug}
								label="Read more..."
								local
								className="text-lg sm:text-base"
								onClick={() => {
									//TODO add a bit of an animation
									history.push('/project/' + props.slug);
								}}
							>
								<DocumentTextIcon className="h-5 w-5" />
							</Link>
						</span>
					)}

					<ul className="flex">
						{props.github && (
							<li>
								<Link url={props.github} label="Github" className="text-base">
									<FontAwesomeIcon icon={faGithub} className="mx-1"></FontAwesomeIcon>
								</Link>
							</li>
						)}
						<div className="w-5 text-center">{'|'}</div>
						{props.live && (
							<li>
								<Link url={props.live} label="Live" className="text-base">
									<EyeIcon className="mr-1 h-5 w-5" />
								</Link>
							</li>
						)}
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
