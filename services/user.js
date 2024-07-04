const User = require("../models/user");
const Video = require("../models/video");

const { MongoClient } = require("mongodb");

const createUser = async (username, displayName, password, image) => {
  const newUser = new User({ username, displayName, password });
  newUser.image = "";
  if (image) newUser.image = image;
  newUser.videoIdListLiked = [];
  newUser.videoIdListUnliked = [];
  newUser.commentIdListLiked = [];
  newUser.commentIdListUnliked = [];
  await newUser.save();
  return newUser;
};

const getUser = async (username) => {
  return await User.findOne({ username: username });
};
const getUsers = async () => {
  return await User.find({});
};

const updateUser = async (
  id,
  username,
  displayName,
  password,
  image,
  videoIdListLiked,
  videoIdListUnliked,
  commentIdListLiked,
  commentIdListUnliked
) => {
  const newUser = await getUser(username);
  if (!newUser) return null;
  newUser.username = username;
  newUser.displayName = displayName;
  newUser.password = password;
  newUser.image = image;
  newUser.videoIdListLiked = videoIdListLiked;
  newUser.videoIdListUnliked = videoIdListUnliked;
  newUser.commentIdListLiked = commentIdListLiked;
  newUser.commentIdListUnliked = commentIdListUnliked;
  await newUser.save();
  return newUser;
};
const deleteUser = async (id) => {
  const user = await getUser(id);
  if (!user) return null;

  await user.deleteOne();
  return user;
};

const getUserVideos = async (id) => {
  const user = await User.findOne({ id });
  const allVideos = await Video.find({});
  return allVideos.filter((video) => video.uploader === user.username);
};

const createUserVideo = async (
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
) => {
  const newVideo = new Video({
    id,
    image,
    video,
    title,
    uploader,
    duration,
    visits,
    description,
    likes,
    categoryId,
  });
  if (uploadDate) newVideo.uploadDate = uploadDate;
  return await newVideo.save();
};

const getUserVideo = async (id, pid) => {
  const user = await getUser(id);
  const video = await Video.findById(pid);
  if (video.uploader === user.username) return video;
  return null;
};
const updateUserVideo = async (id, pid, data) => {
  const newVideo = await getUserVideo(id, pid);
  if (!newVideo) return null;

  newVideo.image = data.image;
  newVideo.video = data.video;
  newVideo.duration = data.duration;
  newVideo.image = data.image;
  newVideo.uploadDate = data.uploadDate;
  newVideo.title = data.title;
  newVideo.description = data.description;
  await newVideo.save();
  return newVideo;
};
const deleteUserVideo = async (id, pid) => {
  const video = await getUserVideo(id, pid);
  if (!video) return null;
  await video.deleteOne();
  return video;
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
};
