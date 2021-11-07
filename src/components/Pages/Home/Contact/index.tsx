import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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
	const submitRef = useRef<HTMLButtonElement>(null);

	const [done, setDone] = useState<boolean>(false);
	const [loading, setLoading] = useState<boolean>(false);
	const [awesome, setAwesome] = useState<boolean>(false);

	const maxLength = 1000;

	const annotate = (ref: HTMLElement) => {
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
		if ( name == '' ) { annotate(nameRef.current!); return; }
		if ( email == '' || email.match(/^\S+@\S+\.\S+$/) == null) { annotate(emailRef.current!); return; }
		if ( message == '' ) { annotate(messageRef.current!); return; }

		// setName('');
		// setEmail('');
		// setMessage('');

		setAwesome(true);
		window.setTimeout(() => setLoading(true), 200);

		fetch('https://form.wouter.cloud', {
			method: 'POST',
			headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
			body: encode({
				'name': name,
				'email': email,
				'message': message
			})
		}).then(() => {
			window.setTimeout(() => {
				setDone(true);
			}, 1000);

			window.setTimeout(() => {
				setLoading(false);
				setDone(false);
			}, 2000);

			window.setTimeout(() => {
				setAwesome(false);
			}, 2200);
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
						<input ref={nameRef} type="text" name="name" value={name} onChange={(e) => { setName(e.target.value); }} />
					</p>
					<p>
						<label>Email</label>
						<input ref={emailRef} type="text" name="email" value={email} onChange={(e) => { setEmail(e.target.value); }} />
					</p>
					<p className="message">
						<label>Message <span className="muted">{message.length}/{maxLength}</span></label>
						<textarea maxLength={maxLength} ref={messageRef} name="message" value={message} onChange={(e) => { setMessage(e.target.value); }}/>
					</p>

					<p className="submit">
						<button ref={submitRef} type="submit" className={`${done? 'done': ''} ${loading? 'loading':''} ${awesome? 'awesome': ''}`}>
							Hit me up
							<div className="spinner">
								<div className="rotater"></div>
							</div>
							<div className="overlay">
								{done? <FontAwesomeIcon icon={faCheck}/>: <></>}
							</div>
						</button>
					</p>
				</form>
			</div>
		</section>
	);
}
