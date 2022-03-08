import React, { ReactElement, useContext } from 'react';
import { DocumentRendererProps } from '@keystone-6/document-renderer';
import { Highlighter } from 'components/Highlighter';
import { getApiUri, randomKey } from 'utils';
import MediaContext from 'components/Context/MediaContext';

export const renderers: DocumentRendererProps['renderers'] = {
	inline: {
		relationship: ({ relationship, data }) => {
			if (relationship === 'imaege') {
				return <img className="my-2 rounded-xl" src={getApiUri() + '/images/' + data!.data!.ref} />;
			}
			return null;
		},
		code: ({ children }: { children: React.ReactNode }) => {
			return <code className="rounded-lg bg-hl-bg p-1 font-mono">{children}</code>;
		},
		link: ({ children, href }: { children: React.ReactNode; href: string }) => (
			<a href={href} rel="noreferrer" target="_blank" className="font-bold underline transition-colors hover:text-rose-500">
				{children}
			</a>
		),
	},
	block: {
		paragraph: ({ children, textAlign }: { children: React.ReactNode; textAlign: 'center' | 'end' | undefined }) => {
			const align = textAlign ? (textAlign == 'center' ? 'text-center' : 'text-right') : '';
			return <p className={`mb-8 leading-7 ${align}`}>{children}</p>;
		},

		heading: ({ level, children, textAlign }: { level: 1 | 2 | 3 | 4 | 5 | 6; children: React.ReactNode; textAlign: 'center' | 'end' | undefined }) => {
			const align = textAlign ? (textAlign == 'center' ? 'text-center' : 'text-right') : '';
			const className = `font-head font-bold mb-6 ${align}`;
			switch (level) {
				case 1:
					return <h1 className={className + ' text-5xl'}>{children}</h1>;
				case 2:
					return <h2 className={className + ' text-4xl'}>{children}</h2>;
				case 3:
					return <h3 className={className + ' text-3xl'}>{children}</h3>;
				case 4:
					return <h4 className={className + ' text-2xl'}>{children}</h4>;
				case 5:
					return <h5 className={className + ' text-xl'}>{children}</h5>;
				case 6:
					return <h6 className={className + ' text-lg'}>{children}</h6>;
			}
		},
		list: ({ type, children }: { type: 'ordered' | 'unordered'; children: React.ReactNode[] }) => {
			const items = children.map((item) => <li key={randomKey()}>{item}</li>);

			if (type == 'unordered') return <ul className="list-inside list-disc">{items}</ul>;
			else return <ol className="list-inside list-decimal">{items}</ol>;
		},

		code: ({ children }: { children: string }) => <Highlighter content={children} />,

		divider: () => <hr className="my-2 h-[2px] w-full border-none bg-hl-bg" />,

		layout: ({ layout, children }: { layout: [number, ...number[]]; children: ReactElement[] }) => {
			const media = useContext(MediaContext);
			return (
				<div className={`grid gap-4 ${media.isMobile ? '!grid-cols-1' : ''}`} style={{ gridTemplateColumns: layout.map((x) => `${x}fr`).join(' ') }}>
					{children.map((item) => (
						<div key={randomKey()}>{item}</div>
					))}
				</div>
			);
		},
	},
};
