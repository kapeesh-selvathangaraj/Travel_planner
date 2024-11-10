/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Rating } from "@mui/material";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";

const RatingCard = ({ packageRatings, defaultProfileImg }) => {
  // State to manage which review popup is open
  const [openPopup, setOpenPopup] = useState(null);

  return (
    <>
      {packageRatings &&
        packageRatings.map((rating, i) => {
          const isLongReview = rating.review.length > 90;
          const truncatedReview = isLongReview
            ? rating.review.substring(0, 90)
            : rating.review;

          return (
            <div
              key={i}
              className="main relative w-full rounded-lg border p-3 gap-2 flex flex-col"
            >
              <div className="flex gap-2 items-center">
                <img
                  src={rating.userProfileImg || defaultProfileImg}
                  alt={rating.username[0]}
                  className="border w-6 h-6 border-black rounded-[50%]"
                />
                <p className="font-semibold">{rating.username}</p>
              </div>
              <Rating
                value={rating.rating || 0}
                readOnly
                size="small"
                precision={0.1}
              />
              {/* Review */}
              <p className="break-all">
                <span>
                  {rating.review
                    ? truncatedReview
                    : rating.rating < 3
                    ? "Not Bad"
                    : "Good"}
                </span>
                {isLongReview && (
                  <button
                    className="m-1 font-semibold items-center gap-1 flex"
                    onClick={() => setOpenPopup(i)}
                  >
                    More <FaArrowDown />
                  </button>
                )}
              </p>

              {/* Full review popup */}
              {openPopup === i && isLongReview && (
                <div
                  className="absolute left-0 top-0 bg-white rounded-lg border p-3 shadow-xl"
                  style={{ zIndex: 99 }}
                >
                  <div className="flex gap-2 items-center">
                    <img
                      src={rating.userProfileImg || defaultProfileImg}
                      alt={rating.username[0]}
                      className="border w-6 h-6 border-black rounded-[50%]"
                    />
                    <p className="font-semibold">{rating.username}</p>
                  </div>
                  <Rating
                    value={rating.rating || 0}
                    readOnly
                    size="small"
                    precision={0.1}
                  />
                  <p className="break-words">{rating.review}</p>
                  <button
                    className="m-1 font-semibold flex items-center gap-1"
                    onClick={() => setOpenPopup(null)}
                  >
                    Less <FaArrowUp />
                  </button>
                </div>
              )}
            </div>
          );
        })}
    </>
  );
};

export default RatingCard;
