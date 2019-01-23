import React from "react";
import classnames from "classnames";


const Pagination = props => {

  const {
    totalItems,
    activePage,
    itemsPerPage,
    onChangePage,
    visiblePages,
  } = props;

  if (!totalItems) return null;

  const pagesCount = Math.ceil(totalItems / itemsPerPage);

  const generateBegin = end => {
    const begin = activePage - (visiblePages / 2);

    return begin > 0 ?
      end === pagesCount ?
        pagesCount - visiblePages :
        begin :
      1;
  };

  const generateEnd = () => {
    const end = activePage >= (visiblePages / 2) ?
      activePage + (visiblePages / 2) : visiblePages;
    return pagesCount < end ? pagesCount : end;
  };

  const renderPages = () => {
    const pages = [];
    const end = generateEnd();
    const begin = generateBegin(end);

    for (let i = begin; i <= end; i++)
      i > 0 && pages.push(
        <li
          key={'page_' + i}
          onClick={
            i !== activePage ?
              () => onChangePage(i) : null
          }
          className={classnames(
            "pagination__page",
            { "pagination__page--current": i === activePage }
          )}>
          <a>{i}</a>
        </li>
      );

    return pages;
  };

  return (
    <div className="pagination__container">
      <ul
        role="navigation"
        className="pagination grid u-clearfix">
        <li
          onClick={
            activePage !== 1 ?
              () => onChangePage(activePage - 1) : null
          }
          className={classnames(
            "pagination__back",
            { "pagination--disabled": activePage === 1 }
          )}>
          <a title="Anterior">
            <span></span>
          </a>
        </li>
        {renderPages()}
        <li
          onClick={
            activePage !== pagesCount ?
              () => onChangePage(activePage + 1) : null
          }
          className={classnames(
            "pagination__next",
            { "pagination--disabled": activePage === pagesCount }
          )}>
          <a title="Siguiente">
            <span></span>
          </a>
        </li>
      </ul>
    </div>
  );
};

Pagination.defaultProps = {
  activePage: 1,
  visiblePages: 10,
  itemsPerPage: 50,
};

export default Pagination;