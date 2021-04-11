export type project = {
    url: string;
    name: string;
    description: string;
    thumb: string;
    links: links;
    tags: tag[];
}

export type links = {
    github: string
    live: string
}

type tag = {
    name: string;
    color: string;
    url: string;
}