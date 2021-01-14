import React from 'react';

import Modal from '../../Shared/Modal'
import Form from './Form';

import './styles.scss'

export default function ContactPage() {
	return (
		<Modal id="ContactPage">
      <h3 className="title">Contact</h3>
			<Form />
		</Modal>
	)
}
