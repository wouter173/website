import React, { useContext, useEffect, useState } from 'react';
import MediaContext from '../../../Shared/Context/MediaContext';
import './styles.scss';

export default function Sunrise() {
	const [size, setSize] = useState<number>(0);
	const media = useContext(MediaContext);

	useEffect(() => {
		const root: HTMLDivElement = document.querySelector('#root')!;
		
		media.isDesktop && root.addEventListener('scroll', () => {
			const width = (root.scrollTop / root.clientWidth * 6);
			setSize(width > 1.2? 1.2: width);
		});
	}, []);

	return (
		<div id="riser">
			<div className="sun" style={{ transform: `translate(-50%, -50%) scale(${size})` }} />
		</div>
	);
}
