import React from 'react'
import { RouteProps } from 'react-router-dom'
import Modal from '../../Shared/Modal'
import { project as projectType} from '../../Shared/types/project';

import './styles.scss';

type props = {
	routeProps: RouteProps;
}

export default function index(props: props) {
	const project: projectType = {
		title: "",
		description: "",
		thumbnail: new URL('https://images.unsplash.com/photo-1517476596926-f90f53a90078?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'),
		links: {},
		info: {}
	}

	console.log(props.routeProps.location!.pathname);

	return (
    <Modal id="ProjectPage">
      <div className="thumbnail" style={{backgroundImage: `url(${project.thumbnail})`}}></div>
      <div className="grid">
        <div className="title"></div>
				<ul className="links">
					
				</ul>
        <div className="description"></div>
        <div className="problem"></div>
        <div className="solution"></div>
			</div>
    </Modal>
  );
}
