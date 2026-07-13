'use client';

import PropTypes from 'prop-types';

const VARIANT_STYLES = {
  pill: {
    wrap: 'flex flex-wrap gap-[var(--ui-card-gap)]',
    item: 'flex items-center gap-3 px-[var(--ui-card-pad-x-md)] py-[var(--ui-card-pad-y-sm)] rounded-[var(--ui-card-radius-lg)] border border-slate-100 bg-white shadow-sm min-h-[var(--ui-card-min-h-sm)]',
    dot: 'w-2 h-2 rounded-full bg-sky-500',
    text: 'text-sm font-bold text-slate-700',
  },
  card: {
    wrap: 'grid grid-cols-1 md:grid-cols-2 gap-[var(--ui-card-gap)]',
    item: 'flex items-center gap-3 rounded-[var(--ui-card-radius-lg)] border border-slate-100 bg-slate-50 px-[var(--ui-card-pad-x-sm)] py-[var(--ui-card-pad-y-sm)] min-h-[var(--ui-card-min-h-sm)]',
    dot: 'w-2 h-2 rounded-full bg-sky-500',
    text: 'font-bold text-sm leading-snug text-slate-700',
  },
};

export default function FeatureTokenList({
  items,
  variant = 'pill',
  className = '',
  itemClassName = '',
}) {
  if (!items?.length) {
    return null;
  }

  const styles = VARIANT_STYLES[variant] || VARIANT_STYLES.pill;

  return (
    <div className={`${styles.wrap} ${className}`.trim()}>
      {items.map((item) => (
        <div key={item} className={`${styles.item} ${itemClassName}`.trim()}>
          <span className={styles.dot} aria-hidden="true" />
          <span className={styles.text}>{item}</span>
        </div>
      ))}
    </div>
  );
}

FeatureTokenList.propTypes = {
  items: PropTypes.arrayOf(PropTypes.string).isRequired,
  variant: PropTypes.oneOf(['pill', 'card']),
  className: PropTypes.string,
  itemClassName: PropTypes.string,
};
