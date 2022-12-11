import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import { format, fromUnixTime } from 'date-fns';
import { useMutation, useQuery } from '@apollo/client';
import { addToast } from '~utils/generalUtils';
import Pagination from '~components/Pagination';
import TableHeader, { ColSortDir } from '~components/tables/TableHeader.component';
import { SmallSpinner } from '~components/loaders/loaders';
import AccountStatusPill from '~components/accounts/accountStatusPill/AccountStatusPill.component';
import DeleteAccountDialog from '~core/dialogs/deleteAccount/DeleteAccount.component';
import SearchFilter from './SearchFilter.component';
import C from '~core/constants';
import Dropdown, { DropdownOption } from '~components/dropdown/Dropdown';
import { AccountStatusFilter } from '~types/general';
import * as queries from '~core/queries';
import * as styles from './AccountsList.scss';
import * as sharedStyles from '../../../styles/shared.scss';

export type AccountsListProps = {
	accountsCurrentPage: number;
	accountsSortCol: string;
	accountsSortDir: ColSortDir;
	accountsFilterStr: string;
	accountStatusFilter: AccountStatusFilter;
	onEditAccount: (accountId: number) => void;
	setAccountsSortDir: (sortDir: ColSortDir) => void;
	setAccountsSortCol: (sortCol: string) => void;
	setAccountsCurrentPage: (page: number) => void;
	setAccountsFilterString: (filter: string) => void;
	setAccountStatusFilter: (status: AccountStatusFilter) => void;
	i18n: any;
};

const Row = ({ i18n, firstName, lastName, onEdit, onDelete, accountStatus, lastLoggedIn, expiryDate }: any): JSX.Element => {
	let expiryDateVal: any = <span className={sharedStyles.blank}>&#8212;</span>;
	try {
		if (expiryDate) {
			expiryDateVal = format(fromUnixTime(expiryDate / 1000), C.DATE_FORMAT);
		}
	} catch (e) {}

	let lastLoggedInVal: any = <span className={sharedStyles.blank}>&#8212;</span>;
	try {
		lastLoggedInVal = format(fromUnixTime(lastLoggedIn), C.DATE_FORMAT);
	} catch (lastLoggedInVal) {}

	return (
		<div className={styles.row}>
			<div className={styles.firstName}>{firstName}</div>
			<div className={styles.lastName}>{lastName}</div>
			<div className={styles.status}>
				<AccountStatusPill status={accountStatus} i18n={i18n} />
			</div>
			<div className={styles.lastLoggedIn}>{lastLoggedInVal}</div>
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
const AccountsList = ({
	accountsCurrentPage, accountsSortCol, accountsSortDir, accountsFilterStr, accountStatusFilter, onEditAccount,
	setAccountsSortDir, setAccountsSortCol, setAccountsCurrentPage, setAccountsFilterString, setAccountStatusFilter, i18n
}: AccountsListProps): JSX.Element | null => {
	const [dialogVisible, setDialogVisible] = useState(false);
	const [deleteAccountInfo, setDeleteAccountInfo] = useState<any>(null);
	const [lastData, setLastData] = useState<any>(null);

	const { data, loading, refetch } = useQuery(queries.GET_ACCOUNTS, {
		fetchPolicy: 'cache-and-network',
		variables: {
			offset: (accountsCurrentPage - 1) * NUM_PER_PAGE,
			limit: NUM_PER_PAGE,
			sortCol: accountsSortCol,
			sortDir: accountsSortDir,
			filterStr: accountsFilterStr,
			status: accountStatusFilter
		}
	});

	useEffect(() => {
		refetch();
	}, [accountsFilterStr]);

	useEffect(() => {
		if (data) {
			setLastData(data);
		}
	}, [data]);

	const numItemsOnPage = lastData?.accounts?.results?.length || 0;
	const afterDeletePage = numItemsOnPage === 1 && accountsCurrentPage > 1 ? accountsCurrentPage-1 : accountsCurrentPage;

	const [deleteAccount] = useMutation(queries.DELETE_ACCOUNT, {
		refetchQueries: [
			{
				query: queries.GET_ACCOUNTS,
				variables: {
					offset: (afterDeletePage - 1) * NUM_PER_PAGE,
					limit: NUM_PER_PAGE,
					sortCol: accountsSortCol,
					sortDir: accountsSortDir,
					filterStr: accountsFilterStr,
					status: accountStatusFilter
				}
			}
		],
		onCompleted: () => {
			setDialogVisible(false);
			setDeleteAccountInfo(null);

			addToast({
				message: i18n.accountDeleted,
				type: 'success'
			});
		}
	});

	if (!lastData) {
		return null;
	}

	const { results, totalCount } = lastData.accounts;
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
			label: i18n.lastLoggedIn,
			className: styles.lastLoggedIn,
			field: 'lastLoggedIn',
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

	let content;
	if (totalCount === 0) {
		content = (
			<div className={`${styles.page} ${sharedStyles.emptyText}`}>
				{i18n.noAccountsCreated}
			</div>
		);
	} else {
		const paginationRow = totalCount > NUM_PER_PAGE ? (
			<div className={styles.paginationRow}>
				<Pagination
					numPages={Math.ceil(totalCount / NUM_PER_PAGE)}
					currentPage={accountsCurrentPage}
					onChange={(e: any, pageNum: number): void => setAccountsCurrentPage(pageNum)}
				/>
			</div>
		) : null;

		content = (
			<>
				<div className={styles.accountsListTable}>
					<TableHeader
						cols={cols}
						sortDir={accountsSortDir}
						sortCol={accountsSortCol}
						onSort={(col: string, dir: ColSortDir): void => {
							setAccountsSortCol(col);
							setAccountsSortDir(dir);
						}}
					/>
					<div className={styles.body}>
						{results.map((row: any) => (
							<Row
								key={row.accountId}
								{...row}
								i18n={i18n}
								onEdit={(): void => onEditAccount(row)}
								onDelete={(): void => {
									setDialogVisible(true);
									setDeleteAccountInfo(row);
								}}
							/>
						))}
					</div>
				</div>
				{paginationRow}
			</>
		);
	}

	return (
		<>
			<div className={styles.filtersRow}>
				<SearchFilter
					value={accountsFilterStr}
					onChange={setAccountsFilterString}
				/>
				<Dropdown
					className={styles.accountsFilter}
					value={accountStatusFilter}
					onChange={(selected: DropdownOption): void => setAccountStatusFilter(selected.value as AccountStatusFilter)}
					options={[
						{ value: AccountStatusFilter.all, label: 'Any status' },
						{ value: AccountStatusFilter.live, label: i18n.live },
						{ value: AccountStatusFilter.expired, label: i18n.expired },
						{ value: AccountStatusFilter.disabled, label: i18n.disabled }
					]}
				/>
				{loading && <SmallSpinner />}
				<h4>{totalCount} result(s)</h4>
			</div>
			{content}

			<DeleteAccountDialog
				visible={dialogVisible}
				onClose={(): void => setDialogVisible(false)}
				onExited={(): void => setDeleteAccountInfo(null)}
				onDelete={(): any => {
					deleteAccount({
						variables: {
							accountId: deleteAccountInfo?.accountId
						}
					});
					setAccountsCurrentPage(afterDeletePage);
				}}
				name={`${deleteAccountInfo?.firstName} ${deleteAccountInfo?.lastName}`}
				i18n={i18n}
			/>
		</>
	);
};

export default AccountsList;
