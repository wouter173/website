import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import './styles.scss';

type props = {
	children: React.ReactNode;
	id: string;
}

export default function Modal(props: props) {
	const history = useHistory();

	useEffect(() => {

		document.body.classList.add('modal-open');
		
  	return () => {
			document.body.classList.remove('modal-open');
  	};
	}, [history])

	return (
    <div className="Modal" id={props.id}>
      <div className="content">{props.children}</div>
    </div>
  );
}
