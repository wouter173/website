//DEPRECATED WEIRD COMPONENT
//But it works, don't question it.
import React, { Component, ReactNode } from 'react';

type Props = {
  target: string;
  underline?: boolean;
  children: ReactNode;
};

type State = {
	target: HTMLDivElement | null;
	root: HTMLDivElement | null;
	underlined: boolean;
}

export default class Scroller extends Component<Props, State> {
	constructor(props: Props) {
		super(props);

		this.state = {
			target: document.querySelector(`#${props.target}`)!,
			root: document.querySelector('#root')!,
			underlined: false,
		};
	}

	componentDidMount() {
		if (this.props.underline) {
			this.state.root!.addEventListener('scroll', this.scrollHandler.bind(this));
		}
	}

	componentWillUnmount() {
		if (this.props.underline) {
			this.state.root!.removeEventListener('scroll', this.scrollHandler.bind(this));
		}
	}

	scrollHandler() {
		const target = this.state.target!;
		const root = this.state.root!;

		if(target === null) {
			return this.setState({
				target: document.querySelector(`#${this.props.target}`)!
			});
		}

		if ( root.scrollTop >= target.offsetTop && root.scrollTop < target.offsetTop + target.scrollHeight ) {
			this.setState({underlined: true});
		} else {
			this.setState({underlined: false});
		}
	}

	clickHandler() {
		const root: HTMLDivElement = document.querySelector('#root')!;

		root!.scrollTo({
			top: document.getElementById(this.props.target)!.offsetTop + 1,
			behavior: 'smooth',
		});
	}

	render() {
		return (
			<a href={`#${this.props.target}`} onClick={(e) => { e.preventDefault(); this.clickHandler(); }} className={`${this.state.underlined ? 'active' : ''} scroller`} >
				{this.props.children}
			</a>
		);
	}
}
