
import React, { useState } from 'react';


const Search = () => {
  return (
    <div className="search-wrapper">
      <div className="close-btn">
        <i className="fa fa-times" aria-hidden="true" />
      </div>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <form action="#" method="post">
              <input
                type="search"
                name="search"
                placeholder="Type any keywords..." />
              <button type="submit">
                <i className="fa fa-search" aria-hidden="true" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}


export default Search;
