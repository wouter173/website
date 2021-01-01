import React, { useRef, useEffect } from 'react'
import init from './init';

import "./styles.scss"

export default function Canvas() {
	const ref = useRef<HTMLCanvasElement>(null);

	useEffect(() => { 
		if (ref && ref.current) {
			const canvas = ref.current;
			init(canvas);
		}

	}, [])

	return <canvas ref={ref}/>
}
