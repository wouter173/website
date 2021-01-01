import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

import './styles.scss';

type props = {
	children: React.ReactNode;
	id: string;
	title: string;
}

export default function Modal(props: props) {
	useEffect(() => {
		document.body.classList.add('modal-open');
		
  	return () => {
    	document.body.classList.remove('modal-open');
  	};
	}, [])

	return (
    <div className="Modal" id={props.id}>
      <Link to="/" className="close-btn">
        <FontAwesomeIcon icon={faTimes} />
      </Link>
      <h3 className="title">{props.title}</h3>
      <div className="content">{props.children}</div>
    </div>
  );
}
