import { useMutation } from '@apollo/client/react';
import { HtmlTooltip } from '@generatedata/shared';
import { enqueueSnackbar } from 'notistack';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { Divider, IconButton, List, ListItemButton, ListItemText } from '@mui/material';
import { useMeasure } from '@uidotdev/usehooks';
import type { RefObject } from 'react';
import { useEffect, useRef, useState } from 'react';
import AutoSizer from 'react-input-autosize';
import useOnClickOutside from 'use-onclickoutside';
import DeleteDataSetDialog from '~core/dialogs/deleteDataSet/DeleteDataSetDialog.component';
import { DELETE_DATA_SET } from '~core/mutations';
import * as queries from '~core/queries';
import { CurrentDataSet } from '~store/generator/generator.reducer';

export type GeneratorControlsProps = {
  i18n: any;
  dataSet: CurrentDataSet;
  isLoggedIn: boolean;
  onUpdate: (newDataSetName: string) => void;
  onSaveDataSet: () => void;
  onSaveAs: () => void;
  onShowHistory: () => void;
  onClearGrid: () => void;
  showClearPageDialog: () => void;
  disabled: boolean;
};

const GeneratorControls = ({
  i18n,
  isLoggedIn,
  dataSet,
  onUpdate,
  onSaveDataSet,
  onSaveAs,
  onClearGrid,
  onShowHistory,
  disabled,
  showClearPageDialog
}: GeneratorControlsProps) => {
  const popoverRef = useRef<HTMLElement>(undefined);
  const inputFieldRef = useRef(null);
  const [measureRef, { width = 0 }] = useMeasure();

  const { dataSetId, dataSetName } = dataSet;
  const [dialogVisible, setDeleteDialogVisibility] = useState(false);
  const [newDataSetName, setNewDataSetName] = useState(dataSetName);
  const [dataSetMenuVisible, setMenuVisibility] = useState(false);

  useOnClickOutside(popoverRef as RefObject<HTMLElement>, () => {
    setMenuVisibility(false);
  });

  useEffect(() => {
    setNewDataSetName(dataSetName);
  }, [dataSetName]);

  const [deleteDataSet] = useMutation(DELETE_DATA_SET, {
    refetchQueries: [{ query: queries.GET_DATA_SETS }],
    onCompleted: () => {
      setDeleteDialogVisibility(false);
      onClearGrid();
    }
  });

  const onChange = (e: any): void => {
    setNewDataSetName(e.target.value);
  };

  const onBlur = (): void => {
    // we save the new name if they click outside - since there's no save button, we want to make it really simple
    if (newDataSetName !== dataSetName) {
      saveNewDataSet();
    }
  };

  const saveNewDataSet = (): void => {
    onUpdate(newDataSetName);

    // @ts-ignore-line
    inputFieldRef.current?.blur();

    enqueueSnackbar(i18n.dataSetNameUpdated, { variant: 'success' });
  };

  const onKeyUp = (e: any): void => {
    if (e.key === 'Escape') {
      setNewDataSetName(dataSetName);
      // @ts-ignore-line
      inputFieldRef.current?.blur();
    } else if (e.key === 'Enter') {
      saveNewDataSet();
    }
  };

  const getMenu = () => {
    if (!isLoggedIn || dataSetId === null) {
      return null;
    }

    // interactive
    return (
      <span style={{ display: 'flex', alignItems: 'center' }}>
        <HtmlTooltip
          arrow
          open={dataSetMenuVisible}
          placement="top"
          disableFocusListener
          disableHoverListener
          disableTouchListener
          PopperProps={
            {
              // popperOptions: {
              //   modifiers: {
              // offset: {
              //   offset: '0px, -6px'
              // }
              //   }
              // }
            }
          }
          title={
            <div ref={popoverRef as RefObject<HTMLDivElement>}>
              <List disablePadding>
                <ListItemButton
                  key="saveAs"
                  onClick={(): any => {
                    setMenuVisibility(false);
                    onSaveAs();
                  }}
                >
                  <ListItemText primary={i18n.saveAs} />
                </ListItemButton>
                <ListItemButton
                  key="delete"
                  onClick={(): any => {
                    setMenuVisibility(false);
                    setDeleteDialogVisibility(true);
                  }}
                >
                  <ListItemText primary={i18n.delete} />
                </ListItemButton>
                <ListItemButton
                  key="history"
                  onClick={(): void => {
                    setMenuVisibility(false);
                    onShowHistory();
                  }}
                >
                  <ListItemText primary={i18n.history} />
                </ListItemButton>
              </List>
              <Divider />
              <List disablePadding>
                <ListItemButton
                  key="newDataSet"
                  onClick={(): any => {
                    setMenuVisibility(false);
                    showClearPageDialog();
                  }}
                >
                  <ListItemText primary={i18n.newDataSet} />
                </ListItemButton>
              </List>
            </div>
          }
        >
          <span>
            <IconButton size="small" aria-label={i18n.dataSetOptions} disabled={disabled} onClick={(): void => setMenuVisibility(true)}>
              <ArrowDropDownIcon fontSize="large" />
            </IconButton>
          </span>
        </HtmlTooltip>
      </span>
    );
  };

  const onFocus = (e: any): void => {
    e.preventDefault();

    // this prompts the Save Data Set dialog, which contains a note about having to login/register
    if (!isLoggedIn || dataSetId === null) {
      onSaveDataSet();
      // @ts-ignore-line
      inputFieldRef.current!.blur();
    }
  };

  const maxInputFieldWidth = (width || 0) - 30;

  return (
    <>
      <div ref={measureRef} style={{ display: 'flex' }}>
        <AutoSizer
          className="tour-dataSetName"
          ref={inputFieldRef}
          inputStyle={{ fontSize: 18, maxWidth: maxInputFieldWidth }}
          placeholder={i18n.newDataSet}
          onFocus={onFocus}
          onChange={onChange}
          onKeyUp={onKeyUp}
          onBlur={onBlur}
          value={newDataSetName}
          disabled={disabled}
        />
        {getMenu()}
      </div>

      <DeleteDataSetDialog
        visible={dialogVisible}
        onClose={(): void => setDeleteDialogVisibility(false)}
        onDelete={(): any =>
          deleteDataSet({
            variables: {
              dataSetId
            }
          })
        }
        i18n={i18n}
      />
    </>
  );
};

export default GeneratorControls;
