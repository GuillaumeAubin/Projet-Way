const asyncHandler = require("express-async-handler");

const Post = require("../models/postModel");
const User = require("../models/userModel");

// @desc     Get posts
// @route    GET /api/posts
// @access   Private
const getPosts = asyncHandler(async (req, res) => {
  const posts = await Post.find({ user: req.user.id });

  res.status(200).json(posts);
});

// @desc     Set post
// @route    POST /api/posts
// @access   Private
const setPost = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error("Merci d'ajouter du texte");
  }

  const post = await Post.create({
    text: req.body.text,
    user: req.user.id,
  });

  res.status(200).json(post);
});

// @desc     Update post
// @route    PUT /api/posts/:id
// @access   Private
const updatePost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);

  if (!post) {
    res.status(400);
    throw new Error("Objectif non trouvé");
  }

  // Check for user
  if (!req.user) {
    res.status(401);
    throw new Error("Utilisateur non trouvé");
  }

  // Make sure the logged in user matches the post user
  if (post.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("Utilisateur non autorisé");
  }

  const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(200).json(updatedPost);
});

// @desc     Delete post
// @route    DELETE /api/posts/:id
// @access   Private
const deletePost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);

  if (!post) {
    res.status(400);
    throw new Error("Objectif non trouvé");
  }

  // Check for user
  if (!req.user) {
    res.status(401);
    throw new Error("Utilisateur non trouvé");
  }

  // Make sure the logged in user matches the post user
  if (post.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("Utilisateur non autorisé");
  }

  await post.remove();

  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getPosts,
  setPost,
  updatePost,
  deletePost,
};
