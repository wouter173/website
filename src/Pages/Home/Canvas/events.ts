import Particle from './Particle';

export const resize = (canvas: HTMLCanvasElement) => {
	canvas.height = canvas.offsetHeight;
	canvas.width = canvas.offsetWidth;
}

export const redraw = (ctx: CanvasRenderingContext2D, particles: Array<Particle>) => {
	const gradient = ctx.createLinearGradient(0, 0, 0, ctx.canvas.height)
	gradient.addColorStop(0, '#EB5436');
	gradient.addColorStop(1, '#BF402C');
	ctx.fillStyle = gradient
	ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

	particles.forEach(p => {
		p.redraw();
	})

	window.requestAnimationFrame(() => {
		redraw(ctx, particles);
  });
}