const express = require("express");
const { postModel } = require("../models/post.model");
const postRoute = express.Router();

//ADD POST
postRoute.post("/add", async (req, res) => {
  let { no_of_comments } = req.body;
  no_of_comments = +no_of_comments;
  const user = postModel(req.body);
  await user.save();
  res.status(200).send({ msg: "post created successfully!" });
});

// GET
postRoute.get("/", async (req, res) => {
  const posts = await postModel.find({ userId: req.body.userId });

  res.status(200).send({ data: posts });
});

//TOP
// postRoute.get("/", async (req, res) => {
//   const posts = await postModel.find({ userId: req.body.userId });

//   res.status(200).send({ data: posts });
// });

//UPDATE
postRoute.patch("/update/:id", async (req, res) => {
  const post = await postModel.findOne({ _id: req.params.id });

  try {
    if (post.userId == req.body.userId) {
      const updatedPost = await postModel.findByIdAndUpdate(
        {
          _id: req.params.id,
        },
        req.body,
        { new: true }
      );
      res.status(200).send({ data: updatedPost });
    } else {
      res.status(400).send({ msg: "you can't update the post" });
    }
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});
//DELETE
postRoute.delete("/delete/:id", async (req, res) => {
  const post = await postModel.findOne({ _id: req.params.id });
  console.log(post);
  try {
    if (post.userId == req.body.userId) {
      const deletedPost = await postModel.findByIdAndDelete({
        _id: req.params.id,
      });
      res.status(200).send({ data: deletedPost });
    } else {
      res.status(400).send({ msg: "you can't delete the post" });
    }
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

module.exports = { postRoute };
