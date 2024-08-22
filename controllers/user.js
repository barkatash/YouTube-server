const userService = require("../services/user");
const videoService = require("../services/video");
const { connectToCppServer } = require('../cppClient');

const createUser = async (req, res) => {
  let image = null;
  if (req.files["image"]) image = req.files["image"][0];
  const user = res.json(
    await userService.createUser(
      req.body.username,
      req.body.displayName,
      req.body.password,
      image
    )
  );
  return user.username;
};
const getUser = async (req, res) => {
  const user = await userService.getUser(req.params.id);
  if (!user) {
    return res.status(404).json({ errors: ["User not found"] });
  }
  res.json(user);
};
const getUsers = async (req, res) => {
  const users = await userService.getUsers();
  if (!users) {
    return res.status(404).json({ errors: ["Users not found"] });
  }
  res.json(users);
};
const updateUser = async (req, res) => {
  let image = null;
  if (req.files["image"]) image = req.files["image"][0];
  const user = await userService.updateUser(req.params.id, image, req.body);
  if (!user) {
    return res.status(404).json({ errors: ["User not found"] });
  }
  const sendUser = {
    username: user.username,
    displayName: user.displayName,
    image: user.image,
    videoIdListLiked: user.videoIdListLiked,
    videoIdListUnliked: user.videoIdListUnliked,
    commentIdListLiked: user.commentIdListLiked,
    commentIdListUnliked: user.commentIdListUnliked,
  };
  res.json(sendUser);
};
const deleteUser = async (req, res) => {
  const user = await userService.deleteUser(req.params.id);
  if (!user) {
    return res.status(404).json({ errors: ["User not found"] });
  }
  res.json(user);
};
const getUserVideos = async (req, res) => {
  const videos = await userService.getUserVideos(req.params.id);
  res.json(videos);
};
const createUserVideo = async (req, res) => {
  const {
    id,
    title,
    uploader,
    duration,
    visits,
    uploadDate,
    description,
    likes,
    categoryId,
  } = req.body;
  const image = req.files["image"][0];
  const video = req.files["video"][0];
  res.json(
    await userService.createUserVideo(
      id,
      image,
      video,
      title,
      uploader,
      duration,
      visits,
      uploadDate,
      description,
      likes,
      categoryId
    )
  );
};
const getUserVideo = async (req, res) => {
  const video = await userService.getUserVideo(req.params.id, req.params.pid);
  if (!video) {
    return res.status(404).json({ errors: ["Video not found"] });
  }
  res.json(video);
};
const updateUserVideo = async (req, res) => {
  const { title, duration, description } = req.body;
  let image = null;
  let video = null;
  if (req.files["image"]) image = req.files["image"][0];
  if (req.files["video"]) video = req.files["video"][0];
  const newVideo = await userService.updateUserVideo(
    req.params.id,
    req.params.pid,
    image,
    video,
    title,
    duration,
    description
  );
  if (!newVideo) {
    return res.status(404).json({ errors: ["Video not found"] });
  }
  res.json(newVideo);
};
const updateUserLikeVideo = async (req, res) => {
  const { newLikes } = req.body;
  const newVideo = await userService.updateUserLikeVideo(
    req.params.id,
    req.params.pid,
    newLikes
  );
  if (!newVideo) {
    return res.status(404).json({ errors: ["Video not found"] });
  }
  res.json(newVideo);
};
const updateUserViewVideo = async (req, res) => {
  const newVideo = await userService.updateUserViewVideo(req.params.pid);
  if (!newVideo) {
    return res.status(404).json({ errors: ["Video not found"] });
  }
  const users = await userService.getUsers();
  const videos = await videoService.getAllVideos();

  const recommendations = await connectToCppServer(req.params.id, req.params.pid, videos, users);
  console.log(recommendations);
  res.json({ video: newVideo, recommendations });
};
const deleteUserVideo = async (req, res) => {
  const video = await userService.deleteUserVideo(
    req.params.id,
    req.params.pid
  );
  if (!video) {
    return res.status(404).json({ errors: ["Video not found"] });
  }
  res.json(video);
};

module.exports = {
  createUser,
  getUser,
  getUsers,
  updateUser,
  deleteUser,
  getUserVideos,
  createUserVideo,
  getUserVideo,
  updateUserVideo,
  deleteUserVideo,
  updateUserLikeVideo,
  updateUserViewVideo
};
