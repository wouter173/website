import { ProjectType } from 'misc/types';
import Project from './Project';

export default function Header(props: { highlightedProjects: ProjectType[] }) {
	return (
		<header className="relative h-[80vh] w-full bg-center bg-cover" style={{ backgroundImage: "url('/Rectangle.png')" }}>
			<div className="flex flex-col w-11/12 mx-auto  h-full rounded-xl sm:w-3/5 sm:rounded-2xl text-left">
				<section className="mt-auto ">
					<span className="font-head text-2xl font-bold sm:text-6xl">Hi, I&apos;m</span>
					<h1 className="font-head text-5xl sm:text-6xl font-bold">Wouter</h1>
					<span className="block font-head text-xl sm:text-3xl mt-2">your creative web developer.</span>
					{/* <button className="block p-2 px-4 mt-8 text-lg bg-white rounded-lg mix-blend-screen">
						<span className="text-black font-bold text">Resume</span>
					</button> */}
				</section>

				<section className="mt-auto mx-auto w-full mb-4 grid grid-flow-row gap-4 grid-cols-1 lg:grid-cols-2">
					{props.highlightedProjects.map((project) => (
						<Project outline {...project} key={project.slug} />
					))}
				</section>
			</div>
		</header>
	);
}
