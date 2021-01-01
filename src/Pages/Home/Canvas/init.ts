import { redraw, resize } from './events';
import { loadIcons } from './loadImg';
import Particle from './Particle';

const init = (canvas: HTMLCanvasElement): CanvasRenderingContext2D => {
	const ctx = canvas.getContext('2d');
	

	if (ctx == null) throw Error("Invalid canvas.");

	resize(canvas);

	loadIcons().then((icons) => {
		console.log(icons)
		
		let particles: Particle[] = [];

		for (let i = 0; i < 30; i++) {
      particles.push(new Particle(ctx, icons));
		}
		
		window.addEventListener('resize', () => {
      resize(canvas);
      redraw(ctx, particles);
		});
		
		redraw(ctx, particles);
  });

	return ctx;
}

export default init;