import ReviewsDAO from "../dao/reviewsDAO.js";
import { ObjectId } from "mongodb";

export default class ReviewsController {
  static async apiPostReview(req, res, next) {
    try {
      const movieId = parseInt(req.body.movieId);
      const review = req.body.review;
      const user = req.body.user;
      const reviewResponse = await ReviewsDAO.addReview(movieId, user, review);
      res.json({ status: "success" });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }
  static async apiGetReview(req, res, next) {
    try {
      let id = req.params.id || {}; // direct from url
      let reviews = await ReviewsDAO.getReview(id);
      if (!reviews) {
        res.status(404).json({ error: "not found" });
        return;
      }
      res.json(reviews);
    } catch (e) {
      console.log(`api, ${e}`);
      res.status(500).json({ error: e });
    }
  }
  static async apiUpdateReview(req, res, next) {
    try {
      const reviewId = new ObjectId(req.params.id);
      const review = req.body.review;
      const user = req.body.user;
      
      const reviewResponse = await ReviewsDAO.updateReview(
        reviewId,
        user,
        review
      );
      
      if (reviewResponse.error) {
        res.status(400).json({ error: reviewResponse.error });
        return;
      }
      
      if (reviewResponse.modifiedCount === 0) {
        res.status(404).json({ error: "Unable to update review - not found" });
        return;
      }
      
      res.json({ status: "success" });
      
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }
  static async apiDeleteReview(req, res, next) {
    try {
      const reviewId = req.params.id;
      const reviewResponse = await ReviewsDAO.deleteReview(reviewId);
      res.json({ status: "success" });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }
  static async apiGetReviews(req, res, next) {
    try {
      let id = req.params.id || {}; // direct from url
      let reviews = await ReviewsDAO.getReviewsByMovieId(id);
      if (!reviews) {
        res.status(404).json({ error: "not found" });
        return;
      }
      res.json(reviews);
    } catch (e) {
      console.log(`api, ${e}`);
      res.status(500).json({ error: e });
    }
  }
}
