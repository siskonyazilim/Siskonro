'use client';

import { useState } from 'react';
import PropTypes from 'prop-types';

const COLUMN_CLASSES = {
  two: 'grid-cols-1 md:grid-cols-2',
  three: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
  four: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
};

const TONE_CLASSES = {
  plain: 'hover:bg-white hover:shadow-md',
  soft: 'hover:bg-slate-50 hover:shadow-md',
  solid: 'bg-white border border-slate-100 hover:border-sky-200 hover:shadow-lg',
};

const ICON_SIZE_CLASSES = {
  md: 'w-8 h-8',
  lg: 'w-9 h-9',
};

export default function ChecklistCardGrid({
  items,
  columns = 'three',
  tone = 'plain',
  iconSize = 'md',
  gapClassName = 'gap-[var(--ui-card-gap-lg)]',
  gridClassName = '',
  cardClassName = '',
  textClassName = '',
  mobileCollapsible = false,
  mobileInitialCount = 3,
  showMoreLabel = 'Devamı için Tıklayınız',
  showLessLabel = 'Daha Az Göster',
}) {
  const [showAllMobileItems, setShowAllMobileItems] = useState(false);

  if (!items?.length) {
    return null;
  }

  const columnClass = COLUMN_CLASSES[columns] || COLUMN_CLASSES.three;
  const toneClass = TONE_CLASSES[tone] || TONE_CLASSES.plain;
  const iconSizeClass = ICON_SIZE_CLASSES[iconSize] || ICON_SIZE_CLASSES.md;
  const hasMoreMobileItems = mobileCollapsible && items.length > mobileInitialCount;
  const mobileItems = hasMoreMobileItems && !showAllMobileItems
    ? items.slice(0, mobileInitialCount)
    : items;

  const renderGrid = (gridItems, extraClassName = '', forceVisible = false) => (
    <div className={`grid ${columnClass} ${gapClassName} items-stretch auto-rows-fr ${gridClassName} ${extraClassName}`.trim()}>
      {gridItems.map((item) => (
        <article key={item} className={`reveal ${(forceVisible || showAllMobileItems) ? 'is-visible' : ''} group h-full min-h-[var(--ui-card-min-h-md)] flex items-center gap-4 px-[var(--ui-card-pad-x-md)] py-[var(--ui-card-pad-y-md)] rounded-[var(--ui-card-radius-md)] transition-all duration-300 ${toneClass} ${cardClassName}`.trim()}>
          <div className={`${iconSizeClass} rounded-full bg-sky-100 flex items-center justify-center shrink-0 group-hover:bg-sky-500 transition-colors`}>
            <svg className="w-4 h-4 text-sky-600 group-hover:text-white transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <p className={`text-slate-700 font-medium leading-relaxed ${textClassName}`.trim()}>{item}</p>
        </article>
      ))}
    </div>
  );

  if (!hasMoreMobileItems) {
    return renderGrid(items);
  }

  return (
    <>
      <div className="md:hidden">
        {renderGrid(mobileItems, '', true)}
        <button
          type="button"
          onClick={() => setShowAllMobileItems((prev) => !prev)}
          aria-expanded={showAllMobileItems}
          className="mt-4 mx-auto flex items-center justify-center gap-2 rounded-md bg-[#0388d1] px-5 py-2 text-white font-semibold"
        >
          <span>{showAllMobileItems ? showLessLabel : showMoreLabel}</span>
          <svg
            viewBox="0 0 24 24"
            className={`h-4 w-4 transition-transform ${showAllMobileItems ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M6 9l6 6 6-6" />
          </svg>
        </button>
      </div>

      <div className="hidden md:block">
        {renderGrid(items)}
      </div>
    </>
  );
}

ChecklistCardGrid.propTypes = {
  items: PropTypes.arrayOf(PropTypes.string).isRequired,
  columns: PropTypes.oneOf(['two', 'three', 'four']),
  tone: PropTypes.oneOf(['plain', 'soft', 'solid']),
  iconSize: PropTypes.oneOf(['md', 'lg']),
  gapClassName: PropTypes.string,
  gridClassName: PropTypes.string,
  cardClassName: PropTypes.string,
  textClassName: PropTypes.string,
  mobileCollapsible: PropTypes.bool,
  mobileInitialCount: PropTypes.number,
  showMoreLabel: PropTypes.string,
  showLessLabel: PropTypes.string,
};
