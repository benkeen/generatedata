import { Dropdown, SmallSpinner, TextField, useSharedClasses } from '@generatedata/core';
import { CountryNamesMap, DataTypeFolder, DTOptionsMetadata } from '@generatedata/plugins';
import DragIndicator from '@mui/icons-material/DragIndicator';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import InfoIcon from '@mui/icons-material/InfoOutlined';
import * as React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { LoadDataTypeBundleOptions } from '~store/generator/generator.actions';
import { DataRow } from '~store/generator/generator.reducer';
import { useClasses } from './Grid.styles';
import { SmallScreenSettingsIcon } from './SmallScreenSettingsIcon';

const getItemStyle = (isDragging: boolean, draggableStyle: any): React.CSSProperties => {
  const styles: React.CSSProperties = {
    ...draggableStyle,
    userSelect: 'none',
    margin: '0 0 0 0'
  };
  if (isDragging) {
    styles.background = '#e0ebfd';
  }
  return styles;
};

export type GridRowProps = {
  row: DataRow;
  index: number;
  Example: any;
  Options: any;
  i18n: any;
  countryI18n: any;
  selectedDataTypeI18n: any;
  isDataTypeLoaded: boolean;
  onChangeTitle: (id: string, value: string) => void;
  onConfigureDataType: (id: string, data: any, metadata?: DTOptionsMetadata) => void;
  onSelectDataType: (dataType: DataTypeFolder, opts: LoadDataTypeBundleOptions) => void;
  onRemove: (id: string) => void;
  dtCustomProps: { [propName: string]: any };
  dtDropdownOptions: any;
  gridPanelDimensions: {
    width: number;
    height: number;
  };
  showHelpDialog: (dataType: DataTypeFolder) => void;
  isCountryNamesLoading: boolean;
  isCountryNamesLoaded: boolean;
  countryNamesMap: CountryNamesMap | null;
};

const NoExample = ({ coreI18n, emptyColClass }: any) => <div className={emptyColClass}>{coreI18n.noExamplesAvailable}</div>;
const NoOptions = ({ coreI18n, emptyColClass }: any) => <div className={emptyColClass}>{coreI18n.noOptionsAvailable}</div>;

export const GridRow = ({
  row,
  index,
  Example,
  Options,
  onRemove,
  onChangeTitle,
  onConfigureDataType,
  onSelectDataType,
  dtDropdownOptions,
  i18n,
  countryI18n,
  selectedDataTypeI18n,
  dtCustomProps,
  gridPanelDimensions,
  showHelpDialog,
  isDataTypeLoaded,
  isCountryNamesLoading,
  isCountryNamesLoaded,
  countryNamesMap
}: GridRowProps) => {
  const sharedClasses = useSharedClasses();
  const classNames = useClasses();

  let example: any = null;
  let options: any = null;

  if (isDataTypeLoaded) {
    if (Example) {
      example = (
        <Example
          coreI18n={i18n}
          countryI18n={countryI18n}
          i18n={selectedDataTypeI18n}
          id={row.id}
          data={row.data}
          onUpdate={(data: any): void => onConfigureDataType(row.id, data)}
          emptyColClass={sharedClasses.emptyCol}
          gridPanelDimensions={gridPanelDimensions}
        />
      );
    } else {
      example = <NoExample coreI18n={i18n} emptyColClass={sharedClasses.emptyCol} />;
    }

    if (Options) {
      options = (
        <Options
          coreI18n={i18n}
          countryI18n={countryI18n}
          i18n={selectedDataTypeI18n}
          id={row.id}
          data={row.data}
          onUpdate={(data: any, metadata?: DTOptionsMetadata): void => onConfigureDataType(row.id, data, metadata)}
          gridPanelDimensions={gridPanelDimensions}
          emptyColClass={sharedClasses.emptyCol}
          isCountryNamesLoading={isCountryNamesLoading}
          isCountryNamesLoaded={isCountryNamesLoaded}
          countryNamesMap={countryNamesMap}
          {...dtCustomProps}
        />
      );
    } else {
      options = <NoOptions coreI18n={i18n} emptyColClass={sharedClasses.emptyCol} />;
    }
  } else if (!isDataTypeLoaded && row.dataType) {
    example = <SmallSpinner />;
  }

  const onClickShowHelp = React.useCallback(() => {
    showHelpDialog(row.dataType as DataTypeFolder);
  }, [row.dataType]);

  return (
    <Draggable key={row.id} draggableId={row.id} index={index}>
      {(provided: any, snapshot: any): any => {
        // the title field is always required, regardless of Export Type
        let titleColError = '';
        if (row.dataType) {
          if (row.title.trim() === '') {
            titleColError = i18n.requiredField;
          } else if (row.titleError) {
            titleColError = row.titleError;
          }
        }

        return (
          <div
            className={`${classNames.gridRow} tour-gridRow`}
            key={row.id}
            ref={provided.innerRef}
            {...provided.draggableProps}
            style={getItemStyle(snapshot.isDragging, provided.draggableProps.style)}
          >
            <div className={classNames.orderCol} {...provided.dragHandleProps}>
              <DragIndicator fontSize="small" />
              {index + 1}
            </div>
            <div className={classNames.dataTypeCol}>
              <Dropdown
                className={classNames.dataTypeColDropdown}
                isGrouped={true}
                value={row.dataType}
                onChange={(i: any): void => onSelectDataType(i.value, { gridRowId: row.id })}
                options={dtDropdownOptions}
              />
              <div className={classNames.dataTypeHelp}>
                {row.dataType ? <InfoIcon fontSize="inherit" onClick={onClickShowHelp} /> : null}
              </div>
            </div>
            <div className={classNames.titleCol}>
              <TextField
                error={titleColError}
                value={row.title}
                onChange={(e: any): void => onChangeTitle(row.id, e.target.value)}
                throttle={false}
              />
            </div>
            <div className={classNames.examplesCol}>{example}</div>
            <div className={classNames.optionsCol}>{options}</div>
            <div
              className={classNames.settingsIconCol}
              onClick={(): void => {
                if (row.dataType === null) {
                  return;
                }
              }}
            >
              <SmallScreenSettingsIcon
                id={row.id}
                data={row.data}
                dataType={row.dataType}
                Example={Example}
                Options={Options}
                isDataTypeLoaded={isDataTypeLoaded}
                i18n={i18n}
                countryI18n={countryI18n}
                gridPanelDimensions={gridPanelDimensions}
                selectedDataTypeI18n={selectedDataTypeI18n}
                onConfigureDataType={onConfigureDataType}
                dtCustomProps={dtCustomProps}
              />
            </div>
            <div className={classNames.deleteCol} onClick={(): void => onRemove(row.id)}>
              <HighlightOffIcon />
            </div>
          </div>
        );
      }}
    </Draggable>
  );
};
