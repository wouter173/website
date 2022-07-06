import React from 'react';
import Project from 'components/Home/Project';
import { getApiUri } from 'misc/utils';
import Section from './Section';
import { useStore } from 'lib/state/StateProvider';
import { StoreDataType } from 'misc/types';

export default function Works() {
	const { projects } = useStore<StoreDataType>();

	return (
		<Section title="My work" id="work">
			<div className="mb-28 grid grid-flow-row gap-20">
				{projects.length == 0 ? <span className="mt-20 text-center">Nothing to see here!</span> : null}
				{projects.map((element, i) => {
					return <Project {...element} key={element.title} thumbnail={{ url: getApiUri() + element.thumbnail.url }} inverted={i % 2 == 1} />;
				})}
			</div>
		</Section>
	);
}
