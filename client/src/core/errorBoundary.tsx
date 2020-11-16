import React from 'react';
import { persistor } from './store';
import Button from '@material-ui/core/Button';
import { Cockroach } from '../components/icons';
import Header from './header/Header.container';
import Footer from './footer/Footer.container';

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

	// componentDidCatch(error: any, errorInfo: any): any {
	// 	// logErrorToMyService(error, errorInfo);
	// }

	onClear(): void {
		persistor.purge()
			.then(() => {
				this.setState({
					hasError: false,
					error: ''
				});
			});
	}

	render(): any {
		if (this.state.hasError) {
			return (
				<>
					<Header />
					<div style={{ maxWidth: 600, padding: 20, margin: 'auto' }}>
						<h2>Something went terribly, terribly wrong.</h2>

						<div style={{ display: 'flex', alignItems: 'center', marginTop: -20 }}>
							<div style={{ width: 200 }}>
								<Cockroach size={200} />
							</div>
							<div>
								<p style={{ fontSize: 13, color: '#999999', marginBottom: 20 }}>
									Sorry! Some sort of error occurred. This project is still in alpha so you may see this
									page a little more than you'd like. Feel free to complain about it via
									a <a href="https://github.com/benkeen/generatedata/issues" target="_blank" rel="noopener noreferrer">github issue</a> &#8212; but we will get to it!
								</p>

								<Button
									color="primary"
									variant="outlined"
									onClick={this.onClear}>Curse the developer and start anew</Button>

								<div>{this.state.error}</div>
							</div>
						</div>
					</div>
					<Footer />
				</>
			);
		}
		return this.props.children;
	}
}

export default ErrorBoundary;
