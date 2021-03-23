import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import { format, fromUnixTime } from 'date-fns';
import { useMutation, useQuery } from '@apollo/client';
import * as styles from './AccountsList.scss';
import * as sharedStyles from '../../../styles/shared.scss';
import Pagination from '~components/Pagination';
import TableHeader, { ColSortDir } from '~components/tables/TableHeader.component';
import * as queries from '~core/queries';
import AccountStatusPill from '~components/accounts/accountStatusPill/AccountStatusPill.component';
import DeleteAccountDialog from '~core/dialogs/deleteAccount/DeleteAccount.component';
import C from '~core/constants';

export type AccountsListProps = {
	onEditAccount: (accountId: number) => void;
	i18n: any;
};

const Row = ({ i18n, firstName, lastName, onEdit, onDelete, accountStatus, expiryDate }: any): JSX.Element => {
	let expiryDateVal: any = <span className={sharedStyles.blank}>&#8212;</span>;
	try {
		expiryDateVal = format(fromUnixTime(expiryDate), C.DATE_FORMAT);
	} catch (e) {}

	return (
		<div className={styles.row}>
			<div className={styles.firstName}>{firstName}</div>
			<div className={styles.lastName}>{lastName}</div>
			<div className={styles.status}>
				<AccountStatusPill status={accountStatus} i18n={i18n} />
			</div>
			<div className={styles.expiryDate}>{expiryDateVal}</div>
			<div className={styles.edit}>
				<Button size="small" type="submit" color="primary" variant="outlined" onClick={onEdit}>{i18n.edit}</Button>
			</div>
			<div className={styles.del} onClick={onDelete}>
				<HighlightOffIcon />
			</div>
		</div>
	);
};

const NUM_PER_PAGE = 10;
const AccountsList = ({ onEditAccount, i18n }: AccountsListProps): JSX.Element | null => {
	const [currentPage, setCurrentPage] = useState(1);
	const [deleteAccountId, setDeleteAccountId] = useState<number | null>(null);
	const [sortCol, setSortCol] = useState('lastName');
	const [sortDir, setSortDir] = useState<ColSortDir>(ColSortDir.asc);

	const { data } = useQuery(queries.GET_ACCOUNTS, {
		fetchPolicy: 'cache-and-network',
		variables: {
			offset: (currentPage - 1) * NUM_PER_PAGE,
			limit: NUM_PER_PAGE,
			sortCol,
			sortDir
		}
	});

	const numItemsOnPage = data?.accounts?.results?.length || 0;
	const afterDeletePage = numItemsOnPage === 1 ? currentPage-1 : currentPage;

	const [deleteAccount] = useMutation(queries.DELETE_ACCOUNT, {
		refetchQueries: [
			{
				query: queries.GET_ACCOUNTS,
				variables: {
					offset: (afterDeletePage - 1) * NUM_PER_PAGE,
					limit: NUM_PER_PAGE,
					sortCol,
					sortDir
				}
			}
		],
		onCompleted: () => {
			setDeleteAccountId(null);
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

	const cols = [
		{
			label: i18n.firstName,
			className: styles.firstName,
			field: 'firstName',
			sortable: true
		},
		{
			label: i18n.lastName,
			className: styles.lastName,
			field: 'lastName',
			sortable: true
		},
		{
			label: i18n.status,
			className: styles.status,
			field: 'accountStatus',
			sortable: true
		},
		{
			label: i18n.expiryDate,
			className: styles.expiryDate,
			field: 'expiryDate',
			sortable: true
		},
		{ label: i18n.edit, className: styles.edit },
		{ label: '', className: styles.del }
	];

	return (
		<>
			<div className={styles.accountsListTable}>
				<TableHeader
					cols={cols}
					sortDir={sortDir}
					sortCol={sortCol}
					onSort={(col: string, dir: ColSortDir): void => {
						setSortCol(col);
						setSortDir(dir);
					}}
				/>
				<div className={styles.body}>
					{results.map((row: any) => (
						<Row
							key={row.accountId}
							{...row}
							i18n={i18n}
							onEdit={(): void => onEditAccount(row)}
							onDelete={(): void => setDeleteAccountId(row.accountId)}
						/>
					))}
				</div>
			</div>
			{paginationRow}
			<DeleteAccountDialog
				visible={deleteAccountId !== null}
				onClose={(): void => setDeleteAccountId(null)}
				onDelete={(): any => {
					deleteAccount({
						variables: {
							accountId: deleteAccountId
						}
					});
					setCurrentPage(afterDeletePage);
				}}
				i18n={i18n}
			/>
		</>
	);
};

export default AccountsList;
