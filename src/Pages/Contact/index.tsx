import React, { useState } from 'react'
import Modal from '../../Shared/Modal'

import './styles.scss'

export default function ContactPage() {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [message, setMessage] = useState('');

	return (
		<Modal id="ContactPage" title="Contact">
			<form name="contact" method="post">
				<input type="hidden" name="form-name" value="contact" />
				<div className="group">
					<p>
						<label>Name</label>
						<input type="text" name="name" placeholder="Enter your firstname..." value={name} onChange={(e) => { setName(e.target.value) }} />
					</p>
					<p>
						<label>Email</label>
						<input type="email" name="email" placeholder="Enter your email..." value={email} onChange={(e) => { setEmail(e.target.value) }} />
					</p>
				</div>
				<p>
					<label>Message</label>
					<textarea name="message" placeholder="What do you want to say?" value={message} onChange={(e) => { setMessage(e.target.value) }}/>
				</p>
				<p><button type="submit">Hit me up</button></p>
			</form>
		</Modal>
	)
}
