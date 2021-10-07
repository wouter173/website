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
	underlined: boolean;
}

export default class Scroller extends Component<Props, State> {
	constructor(props: Props) {
		super(props);

		this.state = {
			target: document.querySelector(`#${props.target}`)!,
			underlined: false,
		};
	}

	componentDidMount() {
		if (this.props.underline) {
			this.scrollHandler();
			window.addEventListener('scroll', this.scrollHandler.bind(this));
		}
	}

	componentWillUnmount() {
		if (this.props.underline) {
			window.removeEventListener('scroll', this.scrollHandler.bind(this));
		}
	}

	scrollHandler() {
		const target = this.state.target!;

		if(target === null) {
			return this.setState({
				target: document.querySelector(`#${this.props.target}`)!
			});
		}

		if ( window.scrollY >= target.offsetTop && window.scrollY < target.offsetTop + target.scrollHeight ) {
			this.setState({underlined: true});
		} else {
			this.setState({underlined: false});
		}
	}

	clickHandler() {
		window.scrollTo({
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
