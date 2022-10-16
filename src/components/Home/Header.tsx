export default function Header() {
	return (
		<header className="relative h-[60vh] w-full bg-center bg-cover">
			<div className="flex flex-col w-11/12 mx-auto h-full rounded-xl sm:w-3/5 sm:rounded-2xl text-left">
				<section className="flex flex-col w-full justify-center h-full">
					<div className="flex flex-col sm:flex-row gap-5">
						<span className="font-head text-2xl font-bold sm:text-6xl">Hi, I&apos;m </span>
						<h1 className="font-head text-6xl font-bold sm:inline bg-gradient-to-tl from-rose-500 to-orange-500 bg-clip-text text-transparent">
							Wouter
						</h1>
					</div>
					<span className="block font-head text-2xl sm:text-3xl mt-2">your creative web developer.</span>
					{/* <button className="block p-2 px-4 mt-8 text-lg bg-white rounded-lg mix-blend-screen">
						<span className="text-black font-bold text">Resume</span>
					</button> */}
				</section>
			</div>
		</header>
	);
}
