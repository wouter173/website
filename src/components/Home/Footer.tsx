import React from 'react';
import ExternalLink from 'components/ExternalLink';
import Section from 'components/Home/Section';
import Link from 'next/link';
import { useStore } from 'lib/state/StateProvider';
import { StoreDataType } from 'misc/types';

export default function Footer() {
	const { projects } = useStore<StoreDataType>();

	return (
		<footer>
			<hr className="mb-20 border-metal-light" />
			<Section title="" id="footer" className="min-h-[30vh]">
				<div className="grid">
					<div className="col-start-1">
						<img src={'/logo.svg'} alt="logo" className="h-14 w-14" />
					</div>
					<div className="col-start-2">
						<h3 className="text-lg font-bold font-head">Social media</h3>
						<ul>
							<li>
								<ExternalLink url="https://instagram.com/wouter_db_" label="Instagram" />
							</li>
							<li>
								<ExternalLink url="https://github.com/wouter173">Github</ExternalLink>
							</li>
							<li>
								<ExternalLink url="https://discord.gg/NmHAznB">Discord</ExternalLink>
							</li>
							<li>
								<ExternalLink url="mailto:wouter@debruijn.dev">Mail</ExternalLink>
							</li>
						</ul>
					</div>
					<div className="col-start-3">
						<h3 className="text-lg font-bold font-head">Projects</h3>
						<ul>
							{projects.map((project) =>
								!project.slug.startsWith('hidden-') ? (
									<li key={project.slug} className="text-sm sm:text-base">
										<Link href={'/project/' + project.slug}>{project.title}</Link>
									</li>
								) : null
							)}
						</ul>
					</div>
				</div>
			</Section>
		</footer>
	);
}
