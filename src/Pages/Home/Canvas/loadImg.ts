const loadImg = (url: string): Promise<HTMLImageElement> =>
	new Promise((resolve) => {
	let img = new Image();
	img.onload = () => {
		resolve(img);
	};
	img.src = "/assets/" + url;
});

export const loadIcons = async (): Promise<Array<HTMLImageElement>> => {
	let iconnames = [
    'rounded',
	];

	let icons: Array<HTMLImageElement> = [];
  for (let icon of iconnames) {
		let res = await loadImg('icons/' + icon + '.svg')
		icons.push(res);
	}
	
	return icons;
}