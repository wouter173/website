import React from 'react'
import { Link } from 'react-router-dom'

import './styles.scss'

type props = {
	image: string;
	title: string;
	id: string;
};

const gradient = "radial-gradient(rgba(0,0,0,0), rgba(0,0,0,0.2)), "

export default function Project(props: props) {
	return (
		<Link to={"/project/" + props.id}>
			<div className="project-display" style={{backgroundImage: gradient + "url(" + props.image + ")"}}>
				<h4>{props.title}</h4>
			</div>
		</Link>
	)
}
