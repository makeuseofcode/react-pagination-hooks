import React, { useEffect, useState } from "react";
import "./style.component.css";



function Pagination() {
  const [data, setData] = useState([]);

  const [currentPage, setcurrentPage] = useState(1);
  const [itemsPerPage, setitemsPerPage] = useState(5);

  const [pageNumberLimit, setpageNumberLimit] = useState(5);
  const [maxPageNumberLimit, setmaxPageNumberLimit] = useState(5);
  const [minPageNumberLimit, setminPageNumberLimit] = useState(0);


// logic for getting total number of pages
  const pages = [];
  for (let i = 1; i <= Math.ceil(data.length / itemsPerPage); i++) {
    pages.push(i);
  }

  // logic for displaying a number of items per page 
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const pageItems = data.slice(indexOfFirstItem, indexOfLastItem);

  //fetching data from an api

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos")
      .then((response) => response.json())
      .then((json) => setData(json));
  }, []);

  const displayData = (data) => {
    return (
      <ul>
        {data.length > 0 &&
          data.map((todo, index) => {
            return <li key={index}>{todo.title}</li>;
          })}
      </ul>
    );
  };


// logic for displaying page numbers
  const handleClick = (event) => {
    setcurrentPage(Number(event.target.id));
  };

  const renderPageNumbers = pages.map((number) => {
    if (number < maxPageNumberLimit +1 && number > minPageNumberLimit) {
      return (
        <li
          key={number}
          id={number}
          onClick={handleClick}
          className={currentPage == number ? "active" : null}
        >
          {number}
        </li>
      );
    } else {
      return null;
    }
  });
  

  

  const handleNextbtn = () => {
    setcurrentPage(currentPage + 1);

    if (currentPage + 1 > maxPageNumberLimit) {
      setmaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
      setminPageNumberLimit(minPageNumberLimit + pageNumberLimit);
    }
  };

  const handlePrevbtn = () => {
    setcurrentPage(currentPage - 1);

    if ((currentPage - 1) % pageNumberLimit == 0) {
      setmaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
      setminPageNumberLimit(minPageNumberLimit - pageNumberLimit);
    }
  };




  return (
    <>
      <h1> Pagination Component</h1> <br />
      {displayData(pageItems)}
      <ul className="pageNumbers">
            <li>
            <button
                onClick={handlePrevbtn}
                disabled={currentPage == pages[0] ? true : false}
            >
                Previous
            </button>
            </li>
    
            {renderPageNumbers}

            <li>
            <button
                onClick={handleNextbtn}
                disabled={currentPage == pages[pages.length - 1] ? true : false}
            >
                Next
            </button>
            </li>
      </ul>
    
    </>
  );
}

export default Pagination;