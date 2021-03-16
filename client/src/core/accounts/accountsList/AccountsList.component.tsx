import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import { useQuery } from '@apollo/client';
import * as styles from './AccountsList.scss';
import * as sharedStyles from '../../../styles/shared.scss';
import Pagination from '~components/Pagination';
import * as queries from '~core/queries';
import AccountStatusPill from '~components/accounts/accountStatusPill/AccountStatusPill.component';
import { format, fromUnixTime } from 'date-fns';
import C from '~core/constants';

export type AccountsListProps = {
	i18n: any;
	onChangeTab: (tab: any) => void;
};


const Row = ({ i18n, firstName, lastName, onEdit, accountStatus, dateExpires }: any): JSX.Element => {
	let expiryDate: any = <span className={sharedStyles.blank}>&#8212;</span>;
	try {
		expiryDate = format(fromUnixTime(dateExpires), C.DATE_FORMAT);
	} catch (e) {}

	return (
		<div className={styles.row}>
			<div className={styles.firstName}>{firstName}</div>
			<div className={styles.lastName}>{lastName}</div>
			<div className={styles.status}>
				<AccountStatusPill status={accountStatus} i18n={i18n} />
			</div>
			<div className={styles.expiryDate}>{expiryDate}</div>
			<div className={styles.edit}>
				<Button size="small" type="submit" color="primary" variant="outlined" onClick={onEdit}>{i18n.edit}</Button>
			</div>
			<div className={styles.del}>
				<HighlightOffIcon />
			</div>
		</div>
	);
};

const NUM_PER_PAGE = 10;
const AccountsListComponent = ({ i18n }: AccountsListProps): JSX.Element | null => {
	const [currentPage, setCurrentPage] = useState(1);

	const { data } = useQuery(queries.GET_ACCOUNTS, {
		fetchPolicy: 'no-cache',
		variables: {
			offset: (currentPage - 1) * NUM_PER_PAGE,
			limit: NUM_PER_PAGE
		}
	});

	if (!data) {
		return null;
	}

	const { results, totalCount } = data.accounts;

	if (totalCount === 0) {
		return (
			<div className={`${styles.page} ${sharedStyles.emptyText}`}>
				{i18n.noAccountsCreated}
			</div>
		);
	}

	const paginationRow = totalCount > NUM_PER_PAGE ? (
		<div className={styles.paginationRow}>
			<Pagination
				numPages={Math.ceil(totalCount / NUM_PER_PAGE)}
				currentPage={currentPage}
				onChange={(e: any, pageNum: number): void => setCurrentPage(pageNum)}
			/>
		</div>
	) : null;

	return (
		<>
			<div style={{ width: '100%', marginBottom: 20 }}>
				<div className={`${styles.row} ${styles.header}`}>
					<div className={styles.firstName}>{i18n.firstName}</div>
					<div className={styles.lastName}>{i18n.lastName}</div>
					<div className={styles.status}>{i18n.status}</div>
					<div className={styles.expiryDate}>{i18n.expiryDate}</div>
					<div className={styles.edit} />
					<div className={styles.del} />
				</div>
				<div className={styles.body}>
					{results.map((row: any) => (
						<Row
							key={row.accountId}
							{...row}
							i18n={i18n}
							onEdit={(): void => {}}
						/>
					))}
				</div>
			</div>
			{paginationRow}
		</>
	);
};

export default AccountsListComponent;
