import React from 'react';
import { persistor } from './store';
import Button from '@material-ui/core/Button';
import { Cockroach } from '../components/icons';

class ErrorBoundary extends React.Component<any, any> {
	constructor (props: any) {
		super(props);
		this.state = {
			hasError: false,
			error: ''
		};
		this.onClear = this.onClear.bind(this);
	}

	static getDerivedStateFromError(error: string): any {
		return {
			hasError: true,
			error
		};
	}

	componentDidCatch(error: any, errorInfo: any): any {
		// You can also log the error to an error reporting service
		// logErrorToMyService(error, errorInfo);
	}

	onClear () {
		persistor.purge();
		this.setState({
			hasError: '',
			error: ''
		});
	}

	render() {
		if (this.state.hasError) {
			return (
				<div style={{ maxWidth: 600, padding: 20, margin: 'auto' }}>
					<h2>Something went terribly, terribly wrong.</h2>

					<div style={{ display: 'flex', alignItems: 'center', marginTop: -20 }}>
						<div style={{ width: 200 }}>
							<Cockroach size={200} />
						</div>
						<div>
							<p style={{ fontSize: 13, color: '#999999', marginBottom: 20 }}>
								Sorry! Some sort of error occurred. This project is still in alpha so you may see this
								page a little more than you'd like. On the bright side, the error's been logged and we'll
								get to it. But in the meantime, feel free to complain about it via
								a <a href="https://github.com/benkeen/generatedata/issues" target="_blank"
									 rel="noopener noreferrer">github issue</a> &#8212; that may help focus our efforts.
							</p>

							<Button
								color="primary"
								variant="outlined"
								onClick={this.onClear}>Curse the developer and start anew</Button>
						</div>
					</div>
				</div>
			);
		}
		return this.props.children;
	}
}

export default ErrorBoundary;
