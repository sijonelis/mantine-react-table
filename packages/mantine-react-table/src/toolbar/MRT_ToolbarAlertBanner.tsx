import clsx from 'clsx';
import classes from './MRT_ToolbarAlertBanner.module.css';
import { Fragment } from 'react';
import { ActionIcon, Alert, Badge, Collapse, Flex, Stack } from '@mantine/core';
import { parseFromValuesOrFunc } from '../column.utils';
import { MRT_SelectCheckbox } from '../inputs';
import { type MRT_RowData, type MRT_TableInstance } from '../types';

interface Props<TData extends MRT_RowData> {
  stackAlertBanner?: boolean;
  table: MRT_TableInstance<TData>;
}

export const MRT_ToolbarAlertBanner = <TData extends MRT_RowData>({
  stackAlertBanner,
  table,
}: Props<TData>) => {
  const {
    getPrePaginationRowModel,
    getSelectedRowModel,
    getState,
    options: {
      enableRowSelection,
      enableSelectAll,
      icons: { IconX },
      localization,
      mantineToolbarAlertBannerBadgeProps,
      mantineToolbarAlertBannerProps,
      positionToolbarAlertBanner,
      renderToolbarAlertBannerContent,
      rowCount,
    },
  } = table;
  const { density, grouping, showAlertBanner } = getState();

  const alertProps = parseFromValuesOrFunc(mantineToolbarAlertBannerProps, {
    table,
  });
  const badgeProps = parseFromValuesOrFunc(
    mantineToolbarAlertBannerBadgeProps,
    { table },
  );

  const selectedAlert =
    getSelectedRowModel().rows.length > 0
      ? localization.selectedCountOfRowCountRowsSelected
          ?.replace(
            '{selectedCount}',
            getSelectedRowModel().rows.length.toString(),
          )
          ?.replace(
            '{rowCount}',
            (rowCount ?? getPrePaginationRowModel().rows.length).toString(),
          )
      : null;

  const groupedAlert =
    grouping.length > 0 ? (
      <Flex>
        {localization.groupedBy}{' '}
        {grouping.map((columnId, index) => (
          <Fragment key={`${index}-${columnId}`}>
            {index > 0 ? localization.thenBy : ''}
            <Badge
              className={classes['alert-badge']}
              rightSection={
                <ActionIcon
                  onClick={() => table.getColumn(columnId).toggleGrouping()}
                  size="xs"
                >
                  <IconX />
                </ActionIcon>
              }
              variant="filled"
              {...badgeProps}
            >
              {table.getColumn(columnId).columnDef.header}{' '}
            </Badge>
          </Fragment>
        ))}
      </Flex>
    ) : null;

  return (
    <Collapse
      in={showAlertBanner || !!selectedAlert || !!groupedAlert}
      transitionDuration={stackAlertBanner ? 200 : 0}
    >
      <Alert
        color="blue"
        icon={false}
        {...alertProps}
        className={clsx(
          classes.alert,
          stackAlertBanner &&
            !positionToolbarAlertBanner &&
            classes['alert-stacked'],
          !stackAlertBanner &&
            positionToolbarAlertBanner === 'bottom' &&
            classes['alert-bottom'],
          alertProps?.className,
        )}
      >
        {renderToolbarAlertBannerContent?.({
          groupedAlert,
          selectedAlert,
          table,
        }) ?? (
          <Flex
            className={clsx(
              classes['toolbar-alert'],
              positionToolbarAlertBanner === 'head-overlay' &&
                classes['head-overlay'],
              density,
            )}
          >
            {enableRowSelection &&
              enableSelectAll &&
              positionToolbarAlertBanner === 'head-overlay' && (
                <MRT_SelectCheckbox selectAll table={table} />
              )}
            <Stack>
              {alertProps?.children}
              {alertProps?.children && (selectedAlert || groupedAlert) && (
                <br />
              )}
              {selectedAlert}
              {selectedAlert && groupedAlert && <br />}
              {groupedAlert}
            </Stack>
          </Flex>
        )}
      </Alert>
    </Collapse>
  );
};
