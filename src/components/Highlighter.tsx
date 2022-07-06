import { ClipboardIcon } from '@heroicons/react/solid';
import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import { useCopyToClipboard } from 'react-use';

type Props = {
	content: string;
};

export const Highlighter = (props: Props) => {
	const content = props.content.split('\n');
	const filename = content.shift() as string;
	const lang = filename.split('.')[1];
	// eslint-disable-next-line no-unused-vars
	const [_, copyToClipboard] = useCopyToClipboard();

	return (
		<div className="w-full font-mono">
			<div style={{ gridTemplateColumns: '1.5em 1fr 1.5em' }} className="mt-2 grid h-7 items-center justify-center rounded-t-lg bg-[#3D3D3F] text-tx-sec">
				<span className="col-start-2 col-end-3 text-center text-sm text-inherit">{filename}</span>
				<ClipboardIcon
					onClick={() => copyToClipboard(content.join('\n'))}
					className="col-start-3 col-end-4 float-right h-5 w-5 text-tx-sec transition-colors hover:text-rose-500"
				/>
			</div>
			<SyntaxHighlighter
				className="!mt-0 rounded-b-lg !font-mono"
				showLineNumbers={true}
				showInlineLineNumbers={false}
				lineNumberStyle={{ color: '#828282' }}
				language={lang}
				style={tomorrow}
			>
				{content.join('\n')}
			</SyntaxHighlighter>
		</div>
	);
};
