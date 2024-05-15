import React from 'react';
import SkeletonTable from '../../packages/module/dist/dynamic/SkeletonTable';

describe('SkeletonTable', () => {
  const columns = [
    { title: 'First Column', isSortable: true },
    { title: 'Second Column', isSortable: false },
  ];

  it('renders SkeletonTable with custom columns', () => {
    cy.mount(<SkeletonTable columns={columns} rows={5} ouiaId="custom-columns-table" />);

    cy.get('table[data-ouia-component-id="custom-columns-table"]').should('exist');
    cy.get('thead tr th').should('have.length', 2);
    cy.get('thead tr th').eq(0).should('have.text', 'First Column');
    cy.get('thead tr th').eq(1).should('have.text', 'Second Column');
    cy.get('thead tr th').eq(0).find('.pf-c-table__sort-indicator').should('exist');
    cy.get('thead tr th').eq(1).find('.pf-c-table__sort-indicator').should('not.exist');
    cy.get('tbody tr').should('have.length', 5);
  });

  it('renders SkeletonTable with checkboxes', () => {
    cy.mount(<SkeletonTable columns={columns} rows={3} hasCheckbox={true} ouiaId="checkbox-table" />);

    cy.get('table[data-ouia-component-id="checkbox-table"]').should('exist');
    cy.get('thead tr th').should('have.length', 3);
    cy.get('thead tr th[data-ouia-component-id="checkbox-table-th-checkbox"]').should('exist');
    cy.get('tbody tr').should('have.length', 3);
    cy.get('tbody tr td[data-ouia-component-id^="checkbox-table-td-"][data-ouia-component-id$="-checkbox"]').should('have.length', 3);
  });

  it('renders SkeletonTable with expandable rows', () => {
    cy.mount(<SkeletonTable columns={columns} rows={3} isExpandable={true} ouiaId="expandable-table" />);

    cy.get('table[data-ouia-component-id="expandable-table"]').should('exist');
    cy.get('thead tr th').should('have.length', 3);
    cy.get('thead tr th[data-ouia-component-id="expandable-table-th-expandable"]').should('exist');
    cy.get('tbody tr').should('have.length', 3);
    cy.get('tbody tr td[data-ouia-component-id^="expandable-table-td-"][data-ouia-component-id$="-expandable"]').should('have.length', 3);
  });

  it('renders SkeletonTable with sorting', () => {
    cy.mount(<SkeletonTable columns={columns} rows={5} sortIndex={0} ouiaId="sorted-table" />);

    cy.get('table[data-ouia-component-id="sorted-table"]').should('exist');
    cy.get('thead tr th').should('have.length', 2);
    cy.get('thead tr th').eq(0).should('have.class', 'pf-m-selected');
    cy.get('tbody tr').should('have.length', 5);
  });
});