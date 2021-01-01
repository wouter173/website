import React from 'react'
import Project from './Project'
import './styles.scss'

export default function Projects() {
	let projects = [
    { name: 'test', id: 'test', image: 'https://images.unsplash.com/photo-1517476596926-f90f53a90078?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80', description: 'jnjnjjj' },
		{ name: 'test2', id: 'test2', image: 'https://images.unsplash.com/photo-1517476596926-f90f53a90078?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80', description: 'zcxwqewqe' },		
		{ name: 'test2', id: 'test2', image: 'https://images.unsplash.com/photo-1517476596926-f90f53a90078?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80', description: 'zcxwqewqe' },
		{ name: 'test2', id: 'test2', image: 'https://images.unsplash.com/photo-1517476596926-f90f53a90078?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80', description: 'zcxwqewqe' },
		{ name: 'test2', id: 'test2', image: 'https://images.unsplash.com/photo-1517476596926-f90f53a90078?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80', description: 'zcxwqewqe' },
		{ name: 'test2', id: 'test2', image: 'https://images.unsplash.com/photo-1517476596926-f90f53a90078?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80', description: 'zcxwqewqe' },
  ];

	return (
		<section id="Projects">
			<div className="content">
				<h3>My projects</h3>
				<div className="projects">
					{projects.map(({name, id, image}) => (
						<Project key={id} title={name} image={image} id={id}/>
					))}
				</div>
			</div>
		</section>
	)
}
