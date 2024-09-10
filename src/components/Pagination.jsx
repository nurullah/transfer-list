import PropTypes from "prop-types";
import { Fragment } from "react";

// UI
import styles from './Pagination.module.scss';

function Pagination({ currentPage, itemSize, maxSize, onClick }) {
  const paginationSize = Math.ceil(itemSize/maxSize);
  const paginationData = Array.from(Array(paginationSize).keys());

  const handleClick = (page) => {

    // callback
    if (onClick) {
      onClick(page);
    }
  }

  if (itemSize <= maxSize) return <Fragment />;

  return (
    <ul className={styles.self}>
      {paginationData.map((index) => {
        const page = index + 1;
        
        return (
          <li data-active={currentPage === page} key={page}>
            <button 
              onClick={() => handleClick(page)}>{page}</button>
          </li>
        )
      })}
    </ul>
  )
}

Pagination.propTypes = {
  currentPage: PropTypes.number,
  itemSize: PropTypes.number,
  maxSize: PropTypes.number,
  onClick: PropTypes.func
}

export default Pagination;