import React, { RefObject } from 'react';

export default function Header({ pageRef }: { pageRef: RefObject<HTMLDivElement> }) {
	const clickHandler = () => {
		pageRef.current!.scrollTo({
			top: document.getElementById('work')!.offsetTop + 1,
			behavior: 'smooth',
		});
	};

	return (
		<header className="relative flex h-max min-h-[80vh] rounded-t-xl bg-gradient-to-r from-red-500 to-rose-500 sm:h-screen sm:rounded-t-none">
			<div className="absolute bottom-0 z-20 h-2/5 w-screen bg-bermuda sm:h-0"></div>
			<div className="absolute mt-4 grid h-4/5 w-full grid-cols-4 grid-rows-3 gap-4 sm:grid-cols-6 sm:gap-4">
				<div className="col-start-1 row-start-2 rounded-xl bg-white bg-opacity-10 sm:col-start-2"></div>
				<div className="col-span-2 col-start-3 row-start-2 rounded-xl bg-white bg-opacity-10 sm:col-start-4"></div>
				<div className="col-span-2 col-start-2 row-start-1 rounded-xl bg-white bg-opacity-10 sm:col-span-1 sm:col-start-5 sm:row-start-3"></div>
			</div>
			<img src={process.env.PUBLIC_URL + '/header-bottom.svg'} className="absolute bottom-0 sm:w-full" />
			<div className="z-20 mx-auto my-auto block w-11/12 rounded-xl px-8 py-12 text-center sm:w-3/5 sm:rounded-2xl sm:bg-bermuda-card sm:p-14 sm:text-left">
				<h1 className="font-head text-5xl font-bold sm:text-5xl">Hi, I&apos;m Wouter</h1>
				<span className="font-head text-2xl sm:text-2xl">your creative web developer.</span>
				<br />
				<button
					className="mt-8 inline rounded-full bg-gradient-to-r from-red-500 to-rose-500 py-2 px-4 text-left text-base font-medium outline-rose-400 hover:outline active:opacity-90"
					onClick={clickHandler}
				>
					Check out my work!
				</button>
			</div>
		</header>
	);
}
