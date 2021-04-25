import React, { useContext, useRef, useState } from 'react';
import MediaContext from '../../../Shared/Context/MediaContext';
import { encode } from './events';
import './styles.scss';

export default function Contact() {
	const media = useContext(MediaContext);
	const root: HTMLDivElement = document.querySelector('#root')!;

	const [name, setName] = useState<string>('');
	const [email, setEmail] = useState<string>('');
	const [message, setMessage] = useState<string>('');

	const nameRef = useRef<HTMLInputElement>(null);
	const emailRef = useRef<HTMLInputElement>(null);
	const messageRef = useRef<HTMLTextAreaElement>(null);

	const bad = (ref: HTMLElement) => {
		ref.classList.add('red');

		window.setTimeout(() => {
			ref.classList.remove('red');
		}, 500);

		if (media.isMobile) {
			root.scrollTo({
				behavior: 'smooth',
				top: (document.querySelector('#contact') as HTMLDivElement).offsetTop
			});
		}
	};

	const submit = () => {
		if ( name == '' ) { bad(nameRef.current!); return; }
		if ( email == '' || email.match(/^\S+@\S+\.\S+$/) == null) { bad(emailRef.current!); return; }
		if ( message == '' ) { bad(messageRef.current!); return; }

		fetch('/', {
			method: 'POST',
			headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
			body: encode({
				'form-name': 'contact',
				'name': name,
				'email': email,
				'message': message
			})
		}).then(res => {
			res.json();
		}).then(json => {
			console.log(json);
			setName('');
			setEmail('');
			setMessage('');
		}).catch(err => {
			console.log(err);
		});
	};

	return (
		<section id="contact">
			<div className="content">
				<h2>Contact me.</h2>

				<form name="contact" method="post" onSubmit={e => {e.preventDefault(); submit();}}>
					<input type="hidden" name="form-name" value="contact" />
					<p>
						<label>Name</label>
						<input ref={nameRef} type="text" name="name" placeholder="Enter your firstname..." value={name} onChange={(e) => { setName(e.target.value); }} />
					</p>
					<p>
						<label>Email</label>
						<input ref={emailRef} type="text" name="email" placeholder="Enter your email..." value={email} onChange={(e) => { setEmail(e.target.value); }} />
					</p>
					<p className="message">
						<label>Message</label>
						<textarea ref={messageRef} name="message" placeholder="What do you want to say?" value={message} onChange={(e) => { setMessage(e.target.value); }}/>
					</p>

					<p className="submit">
						<button type="submit">Hit me up</button>
					</p>
				</form>
			</div>
		</section>
	);
}
