import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconProp } from '@fortawesome/fontawesome-svg-core'

import './styles.scss'

type props = {
	icon: IconProp;
	title: string;
	children: React.ReactNode;
}

export default function Item(props: props) {
	return (
    <div className="item">
      <div className="item-content">
        <FontAwesomeIcon icon={props.icon} size="4x" />
        <h5>{props.title}</h5>
        {props.children}
      </div>
    </div>
  );
}