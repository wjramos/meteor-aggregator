export const config = {
  itemSelector: '.item',
  layoutMode: 'masonry',
  percentPosition: true,
  stagger: 30,
  masonry: {
      // Using a sizer element is necessary to prevent a vertical collapse between data loads
      // Ex. load all, then load metal, the metal will collapse into a vertical layout if this masonry: {}
      // section is commented out.
      columnWidth: 50,//'.item',
      gutter: 0,
      fitWidth: true
  },
  sortBy: [ 'category', 'subcategory', 'relTimestamp' ], // If you want to set the default sort, do that here.
  getSortData: {
    relTimestamp: '[data-rel-timestamp] parseInt',
    category: '[data-category]',
    subcategory: '[data-subcategory]',
  },
  hiddenStyle: {
    opacity: 0
  },
  visibleStyle: {
    opacity: 1
  }
};
