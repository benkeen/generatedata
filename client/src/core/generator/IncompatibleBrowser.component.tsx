import React from 'react';
import * as styles from './Generator.scss';


const IncompatibleBrowser = ({ i18n }: any): JSX.Element => (
	<div className={styles.incompatibleBrowser}>
		<div>
			<h3>{i18n.noSafari}</h3>

			<p dangerouslySetInnerHTML={{ __html: i18n.safariExplanation }} />

			<div className={styles.icons}>
				<ul>
					<li>
						<a href="https://www.google.com/chrome/" target="_blank" rel="noreferrer">
							<img src="./images/chrome_256x256.png" width="128" />
						</a>
						<label>Chrome</label>
					</li>
					<li>
						<a href="https://www.microsoft.com/en-us/edge" target="_blank" rel="noreferrer">
							<img src="./images/edge_256x256.png" width="128" />
						</a>
						<label>Edge</label>
					</li>
					<li>
						<a href="https://www.mozilla.org/en-CA/firefox/new/" target="_blank" rel="noreferrer">
							<img src="./images/firefox_256x256.png" width="128" />
						</a>
						<label>Firefox</label>
					</li>
				</ul>
			</div>
		</div>
	</div>
);

export default IncompatibleBrowser;
