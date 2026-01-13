import { useMutation, useQuery } from '@apollo/client/react';
import { SecondaryButton, useSharedClasses } from '@generatedata/core';
import { DataSetListItem } from '../../../../types/dataSets';
import { formatUnixTime } from '@generatedata/utils/date';
import { getFormattedNum } from '@generatedata/utils/number';
import { getLocale } from '@generatedata/utils/lang';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import Pagination from '~components/Pagination';
import TableHeader, { ColSortDir } from '~components/tables/TableHeader.component';
import DeleteDataSetDialog from '~core/dialogs/deleteDataSet/DeleteDataSetDialog.component';
import { DELETE_DATA_SET } from '~core/mutations';
import * as queries from '~core/queries';
import { GDLocale } from '~types/general';
import { getGeneratorPageRoute } from '~utils/routeUtils';
import { useClasses } from './DataSets.styles';

const Row = ({ onDelete, onLoad, dataSet, i18n }: any) => {
  const classNames = useClasses();
  const locale = getLocale();

  return (
    <div className={classNames.row}>
      <div className={classNames.dataSetName}>{dataSet.dataSetName}</div>
      <div className={classNames.dateCreated}>{formatUnixTime(dataSet.historyDateCreatedUnix)}</div>
      <div className={classNames.numRowsGenerated}>{getFormattedNum(dataSet.numRowsGenerated, locale)}</div>
      <div className={classNames.open}>
        <SecondaryButton size="small" type="submit" onClick={onLoad}>
          {i18n.open}
        </SecondaryButton>
      </div>
      <div className={classNames.del} onClick={onDelete}>
        <HighlightOffIcon />
      </div>
    </div>
  );
};

export type DataSetsProps = {
  locale: GDLocale;
  onLoadDataSet: (dataSet: DataSetListItem) => void;
  onClearCurrentDataSet: () => void;
  currentDataSetId: number | null;
  className: string;
  i18n: any;
};

// to be moved to a user setting at some point
const NUM_PER_PAGE = 10;

const DataSets = ({ onLoadDataSet, locale, i18n, currentDataSetId, className = '', onClearCurrentDataSet }: DataSetsProps) => {
  const navigate = useNavigate();
  const classNames = useClasses();

  const [selectedDataSet, selectDataSet] = useState<DataSetListItem>();
  const [currentPage, setCurrentPage] = useState(1);
  const [dialogVisible, setDeleteDialogVisibility] = useState(false);
  const [sortCol, setSortCol] = useState('dataSetName');
  const [sortDir, setSortDir] = useState<ColSortDir>(ColSortDir.asc);
  const sharedClasses = useSharedClasses();

  const { data } = useQuery(queries.GET_DATA_SETS, {
    fetchPolicy: 'cache-and-network',
    variables: {
      offset: (currentPage - 1) * NUM_PER_PAGE,
      limit: NUM_PER_PAGE,
      sortDir,
      sortCol
    }
  });

  const loadDataSet = (dataSet: DataSetListItem): void => {
    onLoadDataSet(dataSet);
    navigate(getGeneratorPageRoute(locale));
  };

  const numItemsOnPage = data?.dataSets?.results?.length || 0;
  const afterDeletePage = numItemsOnPage === 1 ? currentPage - 1 : currentPage;
  let offset = (afterDeletePage - 1) * NUM_PER_PAGE;
  offset = offset < 0 ? 0 : offset;

  const [deleteDataSet] = useMutation(DELETE_DATA_SET, {
    refetchQueries: [
      {
        query: queries.GET_DATA_SETS,
        variables: {
          offset,
          limit: NUM_PER_PAGE,
          sortDir,
          sortCol
        }
      }
    ],
    onCompleted: () => {
      setDeleteDialogVisibility(false);

      if (currentDataSetId) {
        const { dataSetId: deletedDataSetId } = selectedDataSet as DataSetListItem;

        // double == intentional. Maybe a string
        if (currentDataSetId == deletedDataSetId) {
          onClearCurrentDataSet();
        }
      }
    }
  });

  // show spinner here
  if (!data || !data.dataSets) {
    return null;
  }

  const onShowDeleteDialog = (dataSet: DataSetListItem): void => {
    selectDataSet(dataSet);
    setDeleteDialogVisibility(true);
  };

  const { results, totalCount } = data.dataSets;

  if (totalCount === 0) {
    return (
      <section className={`${className} ${classNames.page}`}>
        <div className={sharedClasses.emptyText}>{i18n.noDataSetsSaved}</div>
      </section>
    );
  }

  const paginationRow =
    totalCount! > NUM_PER_PAGE ? (
      <div className={classNames.paginationRow}>
        <Pagination
          numPages={Math.ceil(totalCount! / NUM_PER_PAGE)}
          currentPage={currentPage}
          onChange={(e: any, pageNum: number): void => setCurrentPage(pageNum)}
        />
      </div>
    ) : null;

  const cols = [
    {
      label: i18n.dataSetName,
      className: classNames.dataSetName,
      field: 'dataSetName',
      sortable: true
    },
    {
      label: i18n.lastModified,
      className: classNames.lastModified,
      field: 'lastUpdated',
      sortable: true
    },
    {
      label: i18n.rowsGenerated,
      className: classNames.numRowsGenerated,
      field: 'numRowsGenerated',
      sortable: true
    },
    { label: i18n.open, className: classNames.open },
    { label: '', className: classNames.del }
  ];

  return (
    <>
      <section className={`${className} ${classNames.page}`}>
        <div className={classNames.table}>
          <TableHeader
            cols={cols}
            sortDir={sortDir}
            sortCol={sortCol}
            onSort={(col: string, dir: ColSortDir): void => {
              setSortCol(col);
              setSortDir(dir);
            }}
          />
          <div className={classNames.bodySection}>
            {(results as unknown as DataSetListItem[])!.map((dataSet: DataSetListItem) => (
              <Row
                key={dataSet.dataSetId}
                dataSet={dataSet}
                onDelete={(): void => onShowDeleteDialog(dataSet)}
                onLoad={(): void => loadDataSet(dataSet)}
                i18n={i18n}
              />
            ))}
          </div>
        </div>
        {paginationRow}
      </section>

      <DeleteDataSetDialog
        visible={dialogVisible}
        dataSetName={selectedDataSet ? selectedDataSet.dataSetName : null}
        onClose={(): void => setDeleteDialogVisibility(false)}
        onDelete={(): any =>
          deleteDataSet({
            variables: {
              dataSetId: selectedDataSet!.dataSetId
            }
          })
        }
        i18n={i18n}
      />
    </>
  );
};

export default DataSets;
