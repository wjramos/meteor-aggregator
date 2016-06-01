export const config = {
  itemSelector:    '.item',
  layoutMode:      'masonry',
  percentPosition: true,
  stagger:         30,
  sortBy:          [
                    'relTimestamp',
                    'category',
                    'subcategory'
                   ],
  masonry: {
      columnWidth: '.col-md-3',
      gutter:      0,
      fitWidth:    true
  },
  getSortData: {
    relTimestamp: '[data-rel-timestamp] parseInt',
    category:     '[data-category]',
    subcategory:  '[data-subcategory]',
  },
  hiddenStyle: {
    opacity: 0
  },
  visibleStyle: {
    opacity: 1
  }
};
