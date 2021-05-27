import React, { useContext, useEffect, useState } from 'react';
import MediaContext from '../../../Shared/Context/MediaContext';
import './styles.scss';

export default function Sunrise() {
	const [size, setSize] = useState<number>(0);
	const media = useContext(MediaContext);
	const max = media.isDesktop? 1.2: 3;

	useEffect(() => {
		window.addEventListener('scroll', () => {
			const width = (window.scrollY / window.innerWidth * 6);
			setSize(width > max? max: width);
		});
	}, []);

	return (
		<div id="riser">
			<div className="sun" style={{ transform: `translate(-50%, -50%) scale(${size})` }} />
		</div>
	);
}
