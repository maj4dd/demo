import { db } from "../db.js";
import Utils from "./Utils.js";

export const deleteReview = (req, res) => {
  const reviewId = req.params.id;
  let { user_id } = req.body;
  const q =
    "DELETE FROM review_system.review_list WHERE `review_id` = ? AND `user_id` = ?";

  db.query(q, [reviewId, user_id], (err, data) => {
    if (err) return res.status(403).json("You can delete only your Review!");
    if (data.affectedRows === 0) {
      return res.status(403).json("You can delete only your Review!");
    }

    return res.json("Review has been deleted!");
  });
};

export const updateReview = (req, res) => {
  const reviewId = req.params.id;
  let { rating, review, restaurant_id, user_id } = req.body;

  const q =
    "UPDATE review_system.review_list SET `rating`=?,`review`=?, `restaurant_id`=?,`date_created`=? WHERE `review_id` = ? AND `user_id` = ?";

  const values = [rating, review, restaurant_id, Utils.formatDate(new Date())];

  db.query(q, [...values, reviewId, "5"], (err, data) => {
    if (data.affectedRows === 0) {
      return res.status(403).json("You can update only your Review!");
    }
    if (err) return res.status(500).json(err);
    return res.json("Review has been updated.");
  });
};

export const getReview = (req, res) => {
  // const q = "SELECT * FROM review_system.review_list WHERE restaurant_id = ? ";
  const q =
    "SELECT review_system.review_list.*, review_system.user_list.username FROM review_system.review_list, review_system.user_list WHERE review_system.review_list.user_id = review_system.user_list.user_id && restaurant_id = ?";

  db.query(q, [req.params.id], (err, data) => {
    if (err) return res.status(500).send(err);
    return res.status(200).json(data);
  });
};

export const addReview = (req, res) => {
  let {
    review,
    restaurant_id,
    user_id,
    food_rating,
    parking_rating,
    ambiance_rating,
    cost_rating,
  } = req.body;

  const q =
    "INSERT INTO review_system.review_list(`review`,`restaurant_id`,`user_id`,`food_rating`,`parking_rating`,`ambiance_rating`,`cost_rating`, `date_created`) VALUES (?)";

  const values = [
    review,
    restaurant_id,
    user_id,
    food_rating,
    parking_rating,
    ambiance_rating,
    cost_rating,
    Utils.formatDate(new Date()),
  ];

  db.query(q, [values], (err, data) => {
    console.log(err);
    if (err) return res.status(500).json(err);

    const q =
      "SELECT review_system.review_list.*, review_system.user_list.username FROM review_system.review_list, review_system.user_list WHERE review_system.review_list.user_id = review_system.user_list.user_id && review_id = ?";

    db.query(q, [data.insertId], (err, data) => {
      if (err) return res.status(500).send(err);
      return res.status(200).json(data[0]);
    });
  });
};

export const removeReview = (req, res) => {};