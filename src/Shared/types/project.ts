export type project = {
	title: string;
	description: string;
	thumbnail: URL;
	info: info;
	links: links;
}

export type links = {
	github?: string;
	live?: string;
}

export type info = {
  problem?: string;
  solution?: string;
};