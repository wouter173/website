import React from 'react';
import { useSelector } from 'react-redux';
import { ProjectsType } from 'types';
import Link from '../../components/Link';
import Section from './Section';

export default function Footer() {
	const { projects } = useSelector<ProjectsType, ProjectsType>((state) => state);

	return (
		<footer>
			<Section title="" id="footer" className="min-h-[30vh]">
				<div className="grid">
					<div className="col-start-1">
						<img src={process.env.PUBLIC_URL + '/logo.svg'} alt="logo" className="h-14 w-14" />
					</div>
					<div className="col-start-2">
						<h3 className="text-lg font-bold">Social media</h3>
						<ul>
							<li>
								<Link url="https://instagram.com/wouter_db_" label="Instagram" />
							</li>
							<li>
								<Link url="https://github.com/wouter173">Github</Link>
							</li>
							<li>
								<Link url="https://discord.gg/NmHAznB">Discord</Link>
							</li>
							<li>
								<Link url="mailto:wouter@debruijn.dev">Mail</Link>
							</li>
						</ul>
					</div>
					<div className="col-start-3">
						<h3 className="text-lg font-bold">Projects</h3>
						<ul>
							{projects.map((project) => (
								<li key={project.slug}>
									<Link url={'/project/' + project.slug} label={project.title} local />
								</li>
							))}
						</ul>
					</div>
				</div>
			</Section>
		</footer>
	);
}
