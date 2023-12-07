import index from '../../algoliaIndex.js';

export const getAllProducts = (searchInput) => {
  return index.search(searchInput, {
    hitsPerPage: 100
  }).then(({ hits }) => {
    return hits;
  });
};
