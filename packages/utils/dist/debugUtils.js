/* istanbul ignore file */
// debugging methods. These should never be included in the actual code
import * as React from 'react';
// quick debugging HOC to find out what props are causing repaints
export function withPropsCheck(WrappedComponent) {
    return class PropsChecker extends React.Component {
        componentWillReceiveProps(nextProps) {
            Object.keys(nextProps)
                .filter((key) => nextProps[key] !== this.props[key])
                .map((key) => {
                console.log('changed property:', key, 'from', this.props[key], 'to', nextProps[key]);
            });
        }
        render() {
            // @ts-ignore-line
            return <WrappedComponent {...this.props}/>;
        }
    };
}
//# sourceMappingURL=debugUtils.js.map