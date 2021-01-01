import { ParticleType, Vector2 } from './types';


export default class Particle implements ParticleType {
	position: Vector2;
	velocity: Vector2;
	icon: HTMLImageElement;
	ctx: CanvasRenderingContext2D;

	constructor(ctx: CanvasRenderingContext2D, icons: Array<HTMLImageElement>) {
		let seed = Math.random();
		this.ctx = ctx;
		this.icon = icons[0]
		this.position = { x: ctx.canvas.width * seed, y: Math.random() * ctx.canvas.height};
		this.velocity = { x: (seed * 3 - 1.5) * -1, y: 2 * seed };
	}

	reset() {
		let seed = Math.random();
		this.position = { x: this.ctx.canvas.width * seed, y: this.ctx.canvas.height };
		this.velocity = { x: (seed * 3 - 1.5) * -1, y: 2 * seed };
	}

	redraw() {
		if (this.position.x < 0 - this.icon.width || this.position.x > this.ctx.canvas.width || this.position.y < (0 - this.icon.height)) this.reset();

		this.ctx.fillStyle = '#B23E29';

		this.ctx.drawImage(this.icon, this.position.x, this.position.y, 20, 20);

		this.position.y -= this.velocity.y;
		this.position.x -= this.velocity.x;
	}
}