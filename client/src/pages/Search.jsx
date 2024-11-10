/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useReducer } from "react";
import { useNavigate } from "react-router-dom";
import PackageCard from "./PackageCard";
import { CircularProgress, Button, TextField, FormControlLabel, Checkbox, Select, MenuItem, InputLabel, FormControl } from "@mui/material";

// Reducer for managing search state
const searchReducer = (state, action) => {
  switch (action.type) {
    case "SET_SEARCH_TERM":
      return { ...state, searchTerm: action.payload };
    case "SET_OFFER":
      return { ...state, offer: action.payload };
    case "SET_SORT":
      return { ...state, sort: action.payload.sort, order: action.payload.order };
    case "RESET":
      return { searchTerm: "", offer: false, sort: "created_at", order: "desc" };
    default:
      return state;
  }
};

const Search = () => {
  const navigate = useNavigate();
  const [state, dispatch] = useReducer(searchReducer, {
    searchTerm: "",
    offer: false,
    sort: "created_at",
    order: "desc",
  });
  const [loading, setLoading] = useState(false);
  const [allPackages, setAllPackages] = useState([]);
  const [showMoreBtn, setShowMoreBtn] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    const offerFromUrl = urlParams.get("offer");
    const sortFromUrl = urlParams.get("sort");
    const orderFromUrl = urlParams.get("order");

    if (searchTermFromUrl || offerFromUrl || sortFromUrl || orderFromUrl) {
      dispatch({
        type: "SET_SEARCH_TERM",
        payload: searchTermFromUrl || "",
      });
      dispatch({
        type: "SET_OFFER",
        payload: offerFromUrl === "true" ? true : false,
      });
      dispatch({
        type: "SET_SORT",
        payload: { sort: sortFromUrl || "created_at", order: orderFromUrl || "desc" },
      });
    }

    const fetchAllPackages = async () => {
      setLoading(true);
      setShowMoreBtn(false);
      try {
        const searchQuery = urlParams.toString();
        const res = await fetch(`/api/package/get-packages?${searchQuery}`);
        const data = await res.json();
        setLoading(false);
        setAllPackages(data?.packages);
        if (data?.packages?.length > 8) {
          setShowMoreBtn(true);
        } else {
          setShowMoreBtn(false);
        }
      } catch (error) {
        setError("Failed to fetch packages. Please try again later.");
        setLoading(false);
      }
    };
    fetchAllPackages();
  }, [location.search]);

  const handleChange = (e) => {
    const { id, value, checked } = e.target;

    if (id === "searchTerm") {
      dispatch({ type: "SET_SEARCH_TERM", payload: value });
    }
    if (id === "offer") {
      dispatch({ type: "SET_OFFER", payload: checked });
    }
    if (id === "sort_order") {
      const [sort, order] = value.split("_");
      dispatch({ type: "SET_SORT", payload: { sort, order } });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams();
    urlParams.set("searchTerm", state.searchTerm);
    urlParams.set("offer", state.offer);
    urlParams.set("sort", state.sort);
    urlParams.set("order", state.order);
    navigate(`/search?${urlParams.toString()}`);
  };

  const onShowMoreClick = async () => {
    const startIndex = allPackages.length;
    const urlParams = new URLSearchParams(location.search);
    urlParams.set("startIndex", startIndex);
    const searchQuery = urlParams.toString();
    const res = await fetch(`/api/package/get-packages?${searchQuery}`);
    const data = await res.json();
    if (data?.packages?.length < 9) {
      setShowMoreBtn(false);
    }
    setAllPackages([...allPackages, ...data?.packages]);
  };

  return (
    <div className="flex flex-col md:flex-row">
      {/* Sidebar */}
      <div className="p-7 border-b-2 md:border-r-2 md:min-h-screen">
        <form className="flex flex-col gap-8" onSubmit={handleSubmit}>
          <TextField
            id="searchTerm"
            label="Search"
            variant="outlined"
            value={state.searchTerm}
            onChange={handleChange}
            fullWidth
          />
          <FormControlLabel
            control={
              <Checkbox
                id="offer"
                checked={state.offer}
                onChange={handleChange}
                color="primary"
              />
            }
            label="Show Offers Only"
          />
          <FormControl fullWidth variant="outlined">
            <InputLabel>Sort by</InputLabel>
            <Select
              value={`${state.sort}_${state.order}`}
              onChange={handleChange}
              label="Sort by"
              id="sort_order"
            >
              <MenuItem value="packagePrice_desc">Price: High to Low</MenuItem>
              <MenuItem value="packagePrice_asc">Price: Low to High</MenuItem>
              <MenuItem value="packageRating_desc">Top Rated</MenuItem>
              <MenuItem value="packageTotalRatings_desc">Most Rated</MenuItem>
              <MenuItem value="createdAt_desc">Newest</MenuItem>
              <MenuItem value="createdAt_asc">Oldest</MenuItem>
            </Select>
          </FormControl>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
          >
            Search
          </Button>
        </form>
        {error && <p className="text-red-500 mt-4">{error}</p>}
      </div>

      {/* Package Results */}
      <div className="flex-1">
        <h1 className="text-xl font-semibold border-b p-3 text-slate-700 mt-5">
          Package Results:
        </h1>
        <div className="w-full p-5 grid 2xl:grid-cols-4 xlplus:grid-cols-3 lg:grid-cols-2 gap-2">
          {!loading && allPackages.length === 0 && (
            <p className="text-xl text-slate-700">No Packages Found!</p>
          )}
          {loading && (
            <div className="w-full flex justify-center">
              <CircularProgress />
            </div>
          )}
          {!loading && allPackages.map((packageData, i) => (
            <PackageCard key={i} packageData={packageData} />
          ))}
        </div>
        {showMoreBtn && (
          <Button
            onClick={onShowMoreClick}
            variant="outlined"
            color="secondary"
            className="m-3"
          >
            Show More
          </Button>
        )}
      </div>
    </div>
  );
};

export default Search;
