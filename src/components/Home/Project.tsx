import React, { PropsWithChildren } from 'react';
import { ChevronRightIcon, ExternalLinkIcon } from '@heroicons/react/solid';
import GithubIcon from 'components/icons/GithubIcon';

import { MetadataType } from 'misc/types';
import Tag from 'components/Tag';
import ExternalLink from 'components/ExternalLink';
import Link from 'next/link';

const Optional = (props: PropsWithChildren<{ condition: boolean }>) => {
	if (props.condition) {
		return <>{props.children}</>;
	}
	return null;
};

export default function Project(props: MetadataType & { outline: boolean }) {
	return (
		<article
			className={`
      ${props.outline ? 'gradient-outline' : ''} 
      relative bg-gradient-to-tl from-metal to-metal-light rounded-lg flex flex-col min-h-max w-full p-6
      shadow-2xl shadow-black/40`}
		>
			<section className="flex items-center">
				{/* <div className="row-span-2 h-14 aspect-square bg-gray-600 rounded-full mr-3" /> */}
				<div>
					<h3 className="font-head text-2xl font-bold sm:text-3xl">{props.title}</h3>
					<ul className="opacity-70 font-bold flex flex-wrap">
						<li key={props.slug + '-project'}>
							<p>project</p>
						</li>
						<Optional condition={props.github != ''}>
							<li className="mx-1">•</li>
							<li key={props.slug + '-github'}>
								<ExternalLink url={props.github}>
									<GithubIcon className="w-4 mr-1 fill-white" />
									Github
								</ExternalLink>
							</li>
						</Optional>

						<Optional condition={props.live != ''}>
							<li className="mx-1">•</li>
							<li key={props.slug + '-live'}>
								<ExternalLink url={props.live}>
									<ExternalLinkIcon className="w-5 mr-1" />
									Live
								</ExternalLink>
							</li>
						</Optional>
					</ul>
				</div>
			</section>
			<section className="flex mt-4">
				<p className="font-bold">{props.description}</p>
			</section>
			<section className="flex mt-8">
				<ul className="mt-auto flex h-min flex-wrap-reverse justify-items-end">
					{props.tags?.map((item) => (
						<Tag key={item.label} label={item.label} color={item.color} url={item.url} />
					))}
				</ul>
				{!props.slug.startsWith('hidden-') && (
					<Link href={'/project/' + props.slug}>
						<a className="font-bold flex items-center ml-auto">
							Read More
							<ChevronRightIcon className="w-5" />
						</a>
					</Link>
				)}
			</section>
		</article>
	);
}

{
	/* <div>
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
</ul> */
}