import { useMutation, useQuery } from '@apollo/client/react';
import C from '@generatedata/config/constants';
import { Dropdown, DropdownOption, SecondaryButton, SmallSpinner, useSharedClasses } from '@generatedata/shared';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import Button from '@mui/material/Button';
import { format, fromUnixTime } from 'date-fns';
import { useEffect, useState } from 'react';
import AccountStatusPill from '~components/accounts/accountStatusPill/AccountStatusPill.component';
import Pagination from '~components/Pagination';
import TableHeader, { ColSortDir } from '~components/tables/TableHeader.component';
import DeleteAccountDialog from '~core/dialogs/deleteAccount/DeleteAccount.component';
import { DELETE_ACCOUNT } from '~core/mutations';
import * as queries from '~core/queries';
import { AccountStatusFilter } from '~types/general';
import { useClasses } from './AccountsList.styles';
import SearchFilter from './SearchFilter.component';
import { enqueueSnackbar } from 'notistack';

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

const Row = ({ i18n, firstName, lastName, onEdit, onDelete, accountStatus, lastLoggedIn, expiryDate }: any) => {
  const sharedClasses = useSharedClasses();
  const classNames = useClasses();

  let expiryDateVal: any = <span className={sharedClasses.blank}>&#8212;</span>;
  try {
    if (expiryDate) {
      expiryDateVal = format(fromUnixTime(expiryDate / 1000), C.DATE_FORMAT);
    }
  } catch (e) {}

  let lastLoggedInVal: any = <span className={sharedClasses.blank}>&#8212;</span>;
  try {
    lastLoggedInVal = format(fromUnixTime(lastLoggedIn), C.DATE_FORMAT);
  } catch (lastLoggedInVal) {}

  return (
    <div className={classNames.row}>
      <div className={classNames.firstName}>{firstName}</div>
      <div className={classNames.lastName}>{lastName}</div>
      <div className={classNames.status}>
        <AccountStatusPill status={accountStatus} i18n={i18n} />
      </div>
      <div className={classNames.lastLoggedIn}>{lastLoggedInVal}</div>
      <div className={classNames.expiryDate}>{expiryDateVal}</div>
      <div className={classNames.edit}>
        <SecondaryButton size="small" type="submit" onClick={onEdit}>
          {i18n.edit}
        </SecondaryButton>
      </div>
      <div className={classNames.del} onClick={onDelete}>
        <HighlightOffIcon />
      </div>
    </div>
  );
};

const NUM_PER_PAGE = 10;
const AccountsList = ({
  accountsCurrentPage,
  accountsSortCol,
  accountsSortDir,
  accountsFilterStr,
  accountStatusFilter,
  onEditAccount,
  setAccountsSortDir,
  setAccountsSortCol,
  setAccountsCurrentPage,
  setAccountsFilterString,
  setAccountStatusFilter,
  i18n
}: AccountsListProps) => {
  const [dialogVisible, setDialogVisible] = useState(false);
  const [deleteAccountInfo, setDeleteAccountInfo] = useState<any>(null);
  const [lastData, setLastData] = useState<any>(null);
  const sharedClasses = useSharedClasses();
  const classNames = useClasses();

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
  const afterDeletePage = numItemsOnPage === 1 && accountsCurrentPage > 1 ? accountsCurrentPage - 1 : accountsCurrentPage;

  const [deleteAccount] = useMutation(DELETE_ACCOUNT, {
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
      enqueueSnackbar(i18n.accountDeleted, { variant: 'success' });
    }
  });

  if (!lastData) {
    return null;
  }

  const { results, totalCount } = lastData.accounts;
  const cols = [
    {
      label: i18n.firstName,
      className: classNames.firstName,
      field: 'firstName',
      sortable: true
    },
    {
      label: i18n.lastName,
      className: classNames.lastName,
      field: 'lastName',
      sortable: true
    },
    {
      label: i18n.status,
      className: classNames.status,
      field: 'accountStatus',
      sortable: true
    },
    {
      label: i18n.lastLoggedIn,
      className: classNames.lastLoggedIn,
      field: 'lastLoggedIn',
      sortable: true
    },
    {
      label: i18n.expiryDate,
      className: classNames.expiryDate,
      field: 'expiryDate',
      sortable: true
    },
    { label: i18n.edit, className: classNames.edit },
    { label: '', className: classNames.del }
  ];

  let content;
  if (totalCount === 0) {
    content = <div className={`${classNames.page} ${sharedClasses.emptyText}`}>{i18n.noAccountsCreated}</div>;
  } else {
    const paginationRow =
      totalCount > NUM_PER_PAGE ? (
        <div className={classNames.paginationRow}>
          <Pagination
            numPages={Math.ceil(totalCount / NUM_PER_PAGE)}
            currentPage={accountsCurrentPage}
            onChange={(e: any, pageNum: number): void => setAccountsCurrentPage(pageNum)}
          />
        </div>
      ) : null;

    content = (
      <>
        <div className={classNames.accountsListTable}>
          <TableHeader
            cols={cols}
            sortDir={accountsSortDir}
            sortCol={accountsSortCol}
            onSort={(col: string, dir: ColSortDir): void => {
              setAccountsSortCol(col);
              setAccountsSortDir(dir);
            }}
          />
          <div className={classNames.tableBody}>
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
      <div className={classNames.filtersRow}>
        <SearchFilter value={accountsFilterStr} onChange={setAccountsFilterString} />
        <Dropdown
          className={classNames.accountsFilter}
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
