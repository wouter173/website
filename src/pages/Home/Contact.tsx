import React from 'react';
import { Field, Form, Formik } from 'formik';
import Section from './Section';
import * as Yup from 'yup';

export default function Contact() {
	const encode = (data: any) => {
		return Object.keys(data)
			.map((key) => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
			.join('&');
	};

	const submit = ({ name, email, message }: { name: string; email: string; message: string }): Promise<Response> => {
		return fetch('https://form.wouter.cloud', {
			method: 'POST',
			headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
			body: encode({
				name: name,
				email: email,
				message: message,
			}),
		});
	};

	const Star = ({ className }: { className: string }) => <span className={`${className} text-red-500 transition-opacity`}>*</span>;

	const FormField = ({ context, name, type, className, as }: { context: any; name: string; type: string; className?: string; as?: string }) => (
		<p className={`${className} flex flex-col`}>
			<label htmlFor={name} className="mb-2">
				<span className="font-bold">{name}</span> <Star className={context.errors[name] ? 'opacity-100' : 'opacity-0'} />
			</label>
			<Field
				disabled={context.isSubmitting}
				className={`${context.isSubmitting ? 'text-gray-400' : ''} h-full resize-none rounded-lg bg-bermuda-card p-2 outline-rose-500 focus:outline`}
				type={type}
				name={name}
				id={name}
				as={as}
			/>
		</p>
	);

	const statusMessage = (context: any) => {
		if (context.status == 'done') return 'Message sent!';
		if (!context.isValid) return 'Fields invalid!';
		if (context.isSubmitting) return 'Sending...';
		return 'Send';
	};

	const schema = Yup.object().shape({
		name: Yup.string().required('Required!'),
		email: Yup.string().email('Invalid email!').required('Required!'),
		message: Yup.string().max(1000).required('Required!'),
	});

	return (
		<Section title="Contact" className="min-h-[80vh] sm:mb-48" id="contact">
			<Formik
				initialValues={{
					name: '',
					email: '',
					message: '',
				}}
				validationSchema={schema}
				onSubmit={async (values, actions) => {
					await submit(values);
					actions.setStatus('done');
					actions.resetForm();
				}}
			>
				{(context) => (
					<Form className="grid gap-4">
						<Field type="hidden" name="form-name" value="contact" />
						<FormField className="col-span-1" context={context} name="name" type="text" />
						<FormField className="col-span-1 " context={context} name="email" type="text" />
						<FormField className="col-span-1 h-48 sm:col-span-2" context={context} name="message" type="text" as="textarea" />
						<p className="col-span-1 sm:col-span-2">
							<Field
								className={`${
									!context.isValid || context.isSubmitting ? 'opacity-60' : 'opacity-100'
								} w-full rounded-lg bg-gradient-to-r from-rose-500 to-red-500 p-2 outline-rose-400 transition-opacity hover:outline focus:outline active:opacity-90`}
								type="submit"
								name="submit"
								disabled={!context.isValid || context.isSubmitting || context.isValidating}
								value={statusMessage(context)}
							/>
						</p>
					</Form>
				)}
			</Formik>
		</Section>
	);
}
