import React, { useEffect, useState } from 'react';
import './styles.scss';

export default function Sunrise() {
	const [size, setSize] = useState<number>(0);

	useEffect(() => {
		const root: HTMLDivElement = document.querySelector('#root')!;
		
		root.addEventListener('scroll', () => {
			const max = 12;
			const width = (root.scrollTop / root.clientHeight) * 40;
			setSize(width > max ? max : width);
		});
	}, []);

	return (
		<div id="riser">
			<div className="sun" style={{ transform: `translate(-50%, -50%) scale(${size})` }} />
		</div>
	);
}
