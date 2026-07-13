'use client';

import PropTypes from 'prop-types';

const COLUMN_CLASSES = {
  one: 'grid-cols-1',
  two: 'grid-cols-1 sm:grid-cols-2',
  three: 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3',
};

const VARIANT_CLASSES = {
  detailed: {
    card: 'rounded-[var(--ui-card-radius-lg)] border border-slate-100 bg-slate-50 px-[var(--ui-card-pad-x-md)] py-[var(--ui-card-pad-y-md)]',
    iconWrap: 'w-12 h-12 rounded-[var(--ui-card-radius-sm)] bg-white border border-slate-200',
    title: 'font-bold text-slate-900',
    desc: 'text-sm text-slate-500 mt-1',
  },
  compact: {
    card: 'rounded-[var(--ui-card-radius-lg)] border border-slate-100 bg-slate-50 px-[var(--ui-card-pad-x-md)] py-[var(--ui-card-pad-y-md)]',
    iconWrap: 'w-10 h-10 rounded-[var(--ui-card-radius-sm)] bg-white border border-slate-200',
    title: 'text-sm font-bold text-slate-700',
    desc: 'hidden',
  },
};

export default function IconFeatureGrid({
  items,
  columns = 'two',
  variant = 'detailed',
  className = '',
  cardClassName = '',
  titleClassName = '',
  descClassName = '',
}) {
  if (!items?.length) {
    return null;
  }

  const colClass = COLUMN_CLASSES[columns] || COLUMN_CLASSES.two;
  const variantClass = VARIANT_CLASSES[variant] || VARIANT_CLASSES.detailed;

  return (
    <div className={`grid ${colClass} gap-[var(--ui-card-gap)] auto-rows-fr items-stretch ${className}`.trim()}>
      {items.map((item) => (
        <article key={`${item.title}-${item.description || ''}`} className={`group h-full min-h-[var(--ui-card-min-h-md)] flex items-center gap-4 transition-all duration-300 hover:border-sky-200 hover:bg-white hover:shadow-md ${variantClass.card} ${cardClassName}`.trim()}>
          <div className={`shrink-0 flex items-center justify-center transition-all duration-300 group-hover:bg-sky-500 ${variantClass.iconWrap}`}>
            <img src={item.icon} alt="" aria-hidden="true" className="w-6 h-6 object-contain opacity-70 group-hover:opacity-100 group-hover:brightness-0 group-hover:invert transition-all" />
          </div>
          <div className="min-w-0">
            <h4 className={`${variantClass.title} ${titleClassName}`.trim()}>{item.title}</h4>
            {item.description ? <p className={`${variantClass.desc} ${descClassName}`.trim()}>{item.description}</p> : null}
          </div>
        </article>
      ))}
    </div>
  );
}

IconFeatureGrid.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      description: PropTypes.string,
      icon: PropTypes.string.isRequired,
    })
  ).isRequired,
  columns: PropTypes.oneOf(['one', 'two', 'three']),
  variant: PropTypes.oneOf(['detailed', 'compact']),
  className: PropTypes.string,
  cardClassName: PropTypes.string,
  titleClassName: PropTypes.string,
  descClassName: PropTypes.string,
};
