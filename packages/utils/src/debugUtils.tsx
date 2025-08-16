/* istanbul ignore file */

// debugging methods. These should never be included in the actual code
import * as React from 'react';

interface Props<P> {
	[key: string]: any;
}

// quick debugging HOC to find out what props are causing repaints
export function withPropsCheck<P>(WrappedComponent: React.ComponentType<P>): React.ComponentClass<Props<P>> {
	return class PropsChecker extends React.Component<Props<P>> {
		componentWillReceiveProps(nextProps: Props<P>): void {
			Object.keys(nextProps)
				.filter((key) => nextProps[key] !== this.props[key])
				.map((key): void => {
					console.log(
						'changed property:', key,
						'from', this.props[key],
						'to', nextProps[key],
					);
				});
		}

		render(): any {
			// @ts-ignore-line
			return <WrappedComponent {...this.props} />;
		}
	};
}


