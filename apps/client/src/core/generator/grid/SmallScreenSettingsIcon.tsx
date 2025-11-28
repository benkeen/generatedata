import React from 'react';
import type { RefObject } from 'react';
import { SmallSpinner } from '@generatedata/core';
import { useClasses } from './Grid.styles';
import SettingsIcon from '@mui/icons-material/SettingsOutlined';
import { HtmlTooltip } from '@generatedata/core';
import useOnClickOutside from 'use-onclickoutside';
import C from '@generatedata/config/constants';
import { useSharedClasses } from '@generatedata/core';

export const SmallScreenSettingsIcon = ({
  id,
  data,
  dataType,
  isDataTypeLoaded,
  Example,
  Options,
  i18n,
  countryI18n,
  gridPanelDimensions,
  selectedDataTypeI18n,
  onConfigureDataType,
  dtCustomProps
}: any): any => {
  const popoverRef = React.useRef<HTMLElement>(undefined);
  const [open, setOpen] = React.useState(false);
  const sharedClasses = useSharedClasses();
  const classNames = useClasses();

  useOnClickOutside(popoverRef as RefObject<HTMLElement>, (e) => {
    // the `gd-is-portal` part is added in case Data Types use other portal-based content besides react select. If
    // that's the case, clicking it will always close the tooltip here. So to get around it, give the portal a class
    // of gd-is-portal. That'll suppress the close event here,

    // @ts-ignore-line
    if (e.target && e.target.closest && (e.target.closest('.react-select__menu') || e.target.closest('gd-is-portal'))) {
      return;
    }
    setOpen(false);
  });

  const handleTooltipOpen = (): void => setOpen(true);

  if (!dataType || gridPanelDimensions.width >= C.GRID.MEDIUM_BREAKPOINT) {
    return null;
  }

  if (!isDataTypeLoaded) {
    return <SmallSpinner className={classNames.smallScreenSpinner} />;
  }

  let example = null;
  let options = null;

  if (Example !== null) {
    example = (
      <>
        <h4>{i18n.example}</h4>
        <div>
          <Example
            coreI18n={i18n}
            countryI18n={countryI18n}
            i18n={selectedDataTypeI18n}
            id={id}
            data={data}
            onUpdate={(data: any): void => onConfigureDataType(id, data)}
            emptyColClass={sharedClasses.emptyCol}
            gridPanelDimensions={gridPanelDimensions}
          />
        </div>
      </>
    );
  }

  if (Options !== null) {
    const titleStyle = Example === null ? {} : { marginTop: 10 };
    options = (
      <>
        <h4 style={titleStyle}>{i18n.options}</h4>
        <Options
          coreI18n={i18n}
          countryI18n={countryI18n}
          i18n={selectedDataTypeI18n}
          id={id}
          data={data}
          onUpdate={(data: any): void => onConfigureDataType(id, data)}
          gridPanelDimensions={gridPanelDimensions}
          emptyColClass={sharedClasses.emptyCol}
          {...dtCustomProps}
        />
      </>
    );
  }

  if (example === null && options === null) {
    return <SettingsIcon className={classNames.disabledBtn} />;
  }

  if (!open) {
    return <SettingsIcon onClick={handleTooltipOpen} />;
  }

  // interactive
  return (
    <HtmlTooltip
      placement="left"
      open={open}
      disableFocusListener
      disableHoverListener
      disableTouchListener
      title={
        <div ref={popoverRef as RefObject<HTMLDivElement>} className={classNames.smallScreenSettingsTooltip}>
          {example}
          {options}
        </div>
      }
      arrow
    >
      <SettingsIcon onClick={handleTooltipOpen} />
    </HtmlTooltip>
  );
};
