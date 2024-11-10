/* eslint-disable no-unused-vars */
import { Rating } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import RatingCard from "./RatingCard";
import { BeatLoader } from "react-spinners"; // Spinner for loading state

const RatingsPage = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [packageRatings, setPackageRatings] = useState([]);
  const [showRatingStars, setShowRatingStars] = useState(0);
  const [totalRatings, setTotalRatings] = useState(0);
  const [loading, setLoading] = useState(false);

  const getRatings = async () => {
    try {
      setLoading(true);
      const res = await fetch(
        `/api/rating/get-ratings/${params.id}/999999999999`
      );
      const res2 = await fetch(`/api/rating/average-rating/${params.id}`);
      const data = await res.json();
      const data2 = await res2.json();
      if (data && data2) {
        setPackageRatings(data);
        setShowRatingStars(data2.rating);
        setTotalRatings(data2.totalRatings);
        setLoading(false);
      } else {
        setPackageRatings("No ratings yet!");
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (params.id) getRatings();
  }, [params.id]);

  return (
    <div className="w-full p-6 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Loading Spinner */}
        {loading && (
          <div className="flex justify-center items-center py-12">
            <BeatLoader color="#4b82f1" loading={loading} size={20} />
          </div>
        )}
        
        {/* Ratings Section */}
        {!loading && !packageRatings && (
          <h1 className="text-center text-2xl text-gray-500">No Ratings Found!</h1>
        )}

        {!loading && packageRatings && (
          <div className="w-full p-4 bg-white shadow-lg rounded-lg">
            <div className="flex justify-between items-center mb-4">
              <h1 className="flex items-center text-xl font-semibold text-gray-800">
                Rating:
                <Rating
                  size="large"
                  value={showRatingStars || 0}
                  readOnly
                  precision={0.1}
                  className="ml-2"
                />
                <span className="text-lg text-gray-600">({totalRatings} ratings)</span>
              </h1>
              <button
                onClick={() => navigate(`/package/${params?.id}`)}
                className="p-2 py-1 px-4 border rounded-lg text-sm bg-gray-800 text-white hover:bg-gray-700 transition"
              >
                Back
              </button>
            </div>

            <hr className="my-4 border-gray-200" />

            <div className="w-full p-2 grid 2xl:grid-cols-7 xl:grid-cols-6 xlplus:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-4">
              <RatingCard packageRatings={packageRatings} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RatingsPage;
