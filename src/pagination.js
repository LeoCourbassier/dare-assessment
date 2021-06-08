const Paginate = (pages, page) => ({
  page: +page,
  next_page: +page + 1 > +pages ? null : +page + 1,
  pages: +pages,
});

export default Paginate;
