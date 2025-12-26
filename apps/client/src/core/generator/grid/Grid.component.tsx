import { closestCenter, DndContext, KeyboardSensor, PointerSensor, UniqueIdentifier, useSensor, useSensors } from '@dnd-kit/core';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import { SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable';
import C from '@generatedata/config/constants';
import { PrimaryButton, Tooltip } from '@generatedata/core';
import { DataTypeFolder } from '@generatedata/plugins';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import { useMeasure } from '@uidotdev/usehooks';
import { useMemo, useState } from 'react';
import { useWindowSize } from 'react-hooks-window-size';
import { DataRow } from '~store/generator/generator.reducer';
import { useClasses } from './Grid.styles';
import GridRow from './GridRow.container';

export type GridProps = {
  rows: DataRow[];
  onAddRows: (numRows: number) => void;
  onSort: (id: string, newIndex: number) => void;
  toggleGrid: () => void;
  i18n: any;
  columnTitle: string;
  changeSmallScreenVisiblePanel: () => void;
  showHelpDialog: (section: DataTypeFolder) => void;
};

const Grid = ({ rows, onAddRows, onSort, i18n, columnTitle, toggleGrid, changeSmallScreenVisiblePanel, showHelpDialog }: GridProps) => {
  const [numRows, setNumRows] = useState(1);
  const windowSize = useWindowSize();
  const [measureRef, { width = 0, height = 0 }] = useMeasure();
  const classNames = useClasses();
  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates
    })
  );

  let gridSizeClass = '';
  if (width && width < C.GRID.SMALL_BREAKPOINT) {
    gridSizeClass = classNames.gridSmall;
  } else if (width && width < C.GRID.MEDIUM_BREAKPOINT) {
    gridSizeClass = classNames.gridMedium;
  }

  const addRowsBtnLabel = numRows === 1 ? i18n.row : i18n.rows;

  const onClose = (): void => {
    if (windowSize.width <= C.SMALL_SCREEN_WIDTH) {
      changeSmallScreenVisiblePanel();
    } else {
      toggleGrid();
    }
  };

  // to prevent repaints. TODO check still neede
  const memoizedDimensions = useMemo(() => ({ width, height }), [width, height]) as { width: number; height: number };

  //   <DragDropContext onDragEnd={({ draggableId, destination }: any): any => onSort(draggableId, destination.index)}>
  //   <Droppable droppableId="droppable">
  //     {(provided: any): any => (
  //       <div className={classNames.grid} {...provided.droppableProps} ref={provided.innerRef}>
  //         {rows.map((row, index) => (
  //           <GridRow
  //             row={row}
  //             key={row.id}
  //             index={index}
  //             gridPanelDimensions={memoizedDimensions}
  //             showHelpDialog={showHelpDialog}
  //           />
  //         ))}
  //       </div>
  //     )}
  //   </Droppable>
  // </DragDropContext>

  // const getIndex = (id: UniqueIdentifier) => rows.indexOf(id);

  return (
    <>
      <div style={{ position: 'fixed', right: 0, padding: 10 }}>
        <span onClick={onClose}>
          <Tooltip title={<span dangerouslySetInnerHTML={{ __html: i18n.closePanel }} />} placement="bottom" arrow>
            <IconButton size="small" aria-label={i18n.closePanel}>
              <CloseIcon fontSize="large" />
            </IconButton>
          </Tooltip>
        </span>
      </div>

      <div className={`${classNames.gridWrapper} ${gridSizeClass}`} ref={measureRef}>
        <div>
          <div className={classNames.gridHeaderWrapper}>
            <div className={`${classNames.gridHeaderRow} tour-gridHeader`} style={{ flex: '0 0 auto' }}>
              <div className={`${classNames.orderCol} ${classNames.orderColHeader}`}>{rows.length}</div>
              <div className={classNames.dataTypeCol}>{i18n.dataType}</div>
              <div className={classNames.titleCol}>{columnTitle}</div>
              <div className={classNames.examplesCol}>{i18n.examples}</div>
              <div className={classNames.optionsCol}>{i18n.options}</div>
              <div className={classNames.settingsIconCol} />
              <div className={classNames.deleteCol} />
            </div>
          </div>
        </div>
        <div className={`${classNames.scrollableGridRows} tour-scrollableGridRows`}>
          <div className={`${classNames.gridRowsWrapper} tour-gridRows`}>
            <DndContext
              sensors={sensors}
              modifiers={[restrictToVerticalAxis]}
              collisionDetection={closestCenter}
              onDragStart={({ active }) => {
                if (!active) {
                  return;
                }
                setActiveId(active.id);
              }}
              onDragEnd={({ over }) => {
                if (over) {
                  console.log('over ...', activeId);
                  // const overIndex = getIndex(over.id);
                  // if (activeIndex !== overIndex) {
                  //   setItems((items) => reorderItems(items, activeIndex, overIndex));
                  //   // onSort();
                  // }
                }
              }}
            >
              <SortableContext items={rows} strategy={verticalListSortingStrategy}>
                {rows.map((row, index) => (
                  <GridRow row={row} key={row.id} index={index} gridPanelDimensions={memoizedDimensions} showHelpDialog={showHelpDialog} />
                ))}
              </SortableContext>
            </DndContext>

            <form onSubmit={(e): any => e.preventDefault()} className={`${classNames.addRows} tour-addRows`}>
              <span>{i18n.add}</span>
              <input
                type="number"
                value={numRows}
                onChange={(e): void => setNumRows(parseInt(e.target.value, 10))}
                min={1}
                max={1000}
                step={1}
              />
              <PrimaryButton size="small" onClick={(): void => onAddRows(numRows)}>
                {addRowsBtnLabel}
              </PrimaryButton>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Grid;
