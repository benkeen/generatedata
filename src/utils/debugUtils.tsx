import * as React from 'react';

interface Props<P> {
	[key: string]: any;
}

export default function withPropsCheck<P>(WrappedComponent: React.ComponentType<P>): React.ComponentClass<Props<P>> {
	return class PropsChecker extends React.Component<Props<P>> {
		componentWillReceiveProps(nextProps: Props<P>) {
			Object.keys(nextProps)
				.filter(key => nextProps[key] !== this.props[key])
				.map((key) => {
					console.log(
						'changed property:',
						key,
						'from',
						this.props[key],
						'to',
						nextProps[key],
					);
				});
		}

		render() {
			// @ts-ignore-line
			return <WrappedComponent {...this.props} />;
		}
	};
}
