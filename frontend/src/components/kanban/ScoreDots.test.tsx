import { render, screen } from '@testing-library/react';
import ScoreDots from './ScoreDots';

describe('ScoreDots', () => {
  it('renders one dot per count', () => {
    const { container } = render(<ScoreDots count={4} />);
    expect(container.querySelectorAll('.score-dot')).toHaveLength(4);
  });

  it('renders no dots when count is 0', () => {
    const { container } = render(<ScoreDots count={0} />);
    expect(container.querySelectorAll('.score-dot')).toHaveLength(0);
  });
});
