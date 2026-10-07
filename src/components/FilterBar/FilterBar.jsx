function FilterBar({ filter, setFilter }) {
  return (
    <div className="filter-buttons">

      <button
        className={filter === "all" ? "active-filter" : ""}
        onClick={() => setFilter("all")}
      >
        All
      </button>

      <button
        className={filter === "available" ? "active-filter" : ""}
        onClick={() => setFilter("available")}
      >
        Available
      </button>

      <button
        className={filter === "price" ? "active-filter" : ""}
        onClick={() => setFilter("price")}
      >
        Under ₹30
      </button>

      <button
        className={filter === "nearest" ? "active-filter" : ""}
        onClick={() => setFilter("nearest")}
      >
        Nearest
      </button>

    </div>
  );
}

export default FilterBar;