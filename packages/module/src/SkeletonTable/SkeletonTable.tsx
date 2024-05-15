import React, { ReactNode } from 'react';
import { Caption, Table, TableProps, TableVariant, Tbody, Td, Th, Thead, Tr } from '@patternfly/react-table';
import { Skeleton } from '@patternfly/react-core';

export type SkeletonTableProps = Omit<TableProps, 'ref'> & {
  /** Indicates the table variant */
  variant?: TableVariant;
  /** The number of rows the skeleton table should contain */
  rows?: number;
  /** Any captions that should be added to the table */
  caption?: ReactNode;
  /** Custom OUIA ID */
  ouiaId?: string | number;
  /** Indicates if the table has checkboxes */
  hasCheckbox?: boolean;
  /** Indicates if the table has expandable rows */
  isExpandable?: boolean;
  /** The index of the sorted column */
  sortIndex?: number;
} & (
    | {
        columns: {
          title: ReactNode;
          isSortable?: boolean;
        }[];
      }
    | {
        numberOfColumns: number;
      }
  );

function hasCustomColumns(props: Record<string, any>): props is SkeletonTableProps & {
  columns: {
    title: ReactNode;
    isSortable?: boolean;
  }[];
} {
  return Array.isArray(props.columns) && props.columns.some((column) => typeof column === 'object');
}

const SkeletonTable: React.FunctionComponent<SkeletonTableProps> = (props: SkeletonTableProps) => {
  const {
    variant,
    rows = 5,
    caption,
    ouiaId = 'SkeletonTable',
    hasCheckbox = false,
    isExpandable = false,
    sortIndex,
    ...rest
  } = props;
  const rowCells = hasCustomColumns(props) ? props.columns.length : props.numberOfColumns;
  const rowArray = [ ...new Array(rowCells) ];
  const bodyRows = [ ...new Array(rows) ].map((_, rowIndex) => (
    <Tr key={rowIndex} ouiaId={`${ouiaId}-tr-${rowIndex}`}>
      {hasCheckbox && (
        <Td key="checkbox" data-ouia-component-id={`${ouiaId}-td-${rowIndex}-checkbox`}>
          <Skeleton width="16px" />
        </Td>
      )}
      {isExpandable && (
        <Td key="expandable" data-ouia-component-id={`${ouiaId}-td-${rowIndex}-expandable`}>
          <Skeleton width="16px" />
        </Td>
      )}
      {rowArray.map((_, colIndex) => (
        <Td key={colIndex} data-ouia-component-id={`${ouiaId}-td-${rowIndex}-${colIndex}`}>
          <Skeleton />
        </Td>
      ))}
    </Tr>
  ));

  return (
    <Table aria-label="Loading" variant={variant} ouiaId={ouiaId} {...rest}>
      {caption && <Caption>{caption}</Caption>}
      <Thead data-ouia-component-id={`${ouiaId}-thead`}>
        <Tr ouiaId={`${ouiaId}-tr-head`}>
          {hasCheckbox && <Th key="checkbox" data-ouia-component-id={`${ouiaId}-th-checkbox`} />}
          {isExpandable && <Th key="expandable" data-ouia-component-id={`${ouiaId}-th-expandable`} />}
          {hasCustomColumns(props)
            ? props.columns.map((column, index) => (
              <Th
                key={index}
                data-ouia-component-id={`${ouiaId}-th-${index}`}
                className={index === sortIndex ? 'pf-m-selected' : ''}
              >
                {column.title}
                {column.isSortable && (
                  <span className="pf-c-table__sort-indicator">
                    <Skeleton width="16px" />
                  </span>
                )}
              </Th>
            ))
            : rowArray.map((_, index) => (
              <Th key={index} data-ouia-component-id={`${ouiaId}-th-${index}`}>
                <Skeleton />
              </Th>
            ))}
        </Tr>
      </Thead>
      <Tbody data-ouia-component-id={`${ouiaId}-tbody`}>{bodyRows}</Tbody>
    </Table>
  );
};

export default SkeletonTable;
