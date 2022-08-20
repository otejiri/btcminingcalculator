export const Paginate = (currentPage, limit, listLength) => {
  const startFrom = (currentPage - 1) * limit;
  const endAt = startFrom + limit;
  const previousPage = currentPage - 1 > 0;
  const nextPage = currentPage * limit + 1 < listLength;
  const pageCount = Math.ceil(listLength / limit);

  const page = {
    startFrom,
    endAt,
    previousPage,
    nextPage,
    pageCount,
  };
  return page;
};
