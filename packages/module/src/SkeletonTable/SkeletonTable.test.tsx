import React from 'react';
import { render } from '@testing-library/react';
import SkeletonTable from './SkeletonTable';

describe('SkeletonTable component', () => {
  it('should render correctly', () => {
    expect(render(<SkeletonTable columns={[ { title: 'first' }, { title: 'second' } ]} />)).toMatchSnapshot();
  });

  it('should render correctly with rows', () => {
    expect(render(<SkeletonTable columns={[ { title: 'first' }, { title: 'second' } ]} rows={5} />)).toMatchSnapshot();
  });

  it('should render correctly with a caption', () => {
    expect(
      render(<SkeletonTable columns={[ { title: 'first' }, { title: 'second' } ]} caption="Test Caption" />)
    ).toMatchSnapshot();
  });

  it('should render correctly with a custom OUAI ID', () => {
    expect(
      render(<SkeletonTable columns={[ { title: 'first' }, { title: 'second' } ]} ouiaId="customID" />)
    ).toMatchSnapshot();
  });

  it('should render correctly with checkboxes', () => {
    expect(render(<SkeletonTable columns={[ { title: 'first' }, { title: 'second' } ]} hasCheckbox />)).toMatchSnapshot();
  });

  it('should render correctly with expandable rows', () => {
    expect(
      render(<SkeletonTable columns={[ { title: 'first' }, { title: 'second' } ]} isExpandable />)
    ).toMatchSnapshot();
  });

  it('should render correctly with a sort index', () => {
    expect(
      render(<SkeletonTable columns={[ { title: 'first' }, { title: 'second' } ]} sortIndex={0} />)
    ).toMatchSnapshot();
  });
});
