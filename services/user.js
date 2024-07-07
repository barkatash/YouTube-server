const User = require("../models/user");
const Video = require("../models/video");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (file.fieldname === "video") {
      cb(null, "public/media/videos/");
    } else if (file.fieldname === "image") {
      cb(null, "public/media/images/");
    }
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 100000000 },
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
}).fields([
  { name: "video", maxCount: 1 },
  { name: "image", maxCount: 1 },
]);

function checkFileType(file, cb) {
  const filetypes = /jpeg|jpg|png|gif|mp4|mov/;

  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb("Error: Images and Videos Only!");
  }
}

const createUser = async (username, displayName, password, image) => {
  const user = await User.findOne({ username: username });
  if (!user) {
    const newUser = new User({ username, displayName, password });
    newUser.image = "";
    if (image) newUser.image = image.destination.replace("public/", "") + image.filename;
    newUser.videoIdListLiked = [];
    newUser.videoIdListUnliked = [];
    newUser.commentIdListLiked = [];
    newUser.commentIdListUnliked = [];
    await newUser.save();
    return newUser;
  }
  return null;
};

const getUser = async (username) => {
  return await User.findOne({ username: username });
};
const getUsers = async () => {
  return await User.find({});
};

const updateUser = async (
  username,
  image,
  newUserData
) => {
  const newUser = await getUser(username);
  if (!newUser) return null;
  if (newUserData.displayName) newUser.displayName = newUserData.displayName;
  if (newUserData.password) newUser.password = newUserData.password;
  if (image) newUser.image = image.destination.replace("public/", "") + image.filename;
  if (newUserData.videoIdListLiked) newUser.videoIdListLiked = newUserData.videoIdListLiked;
  if (newUserData.videoIdListUnliked) newUser.videoIdListUnliked = newUserData.videoIdListUnliked;
  if (newUserData.commentIdListLiked) newUser.commentIdListLiked = newUserData.commentIdListLiked;
  if (newUserData.commentIdListUnliked) newUser.commentIdListUnliked = newUserData.commentIdListUnliked;
  return await newUser.save();
};
const deleteUser = async (id) => {
  const user = await getUser(id);
  if (!user) return null;
  await user.deleteOne();
  return user;
};

const getUserVideos = async (id) => {
  const user = await User.findOne({ username: id});
  if(!user) return null;
  const userVideos = await Video.find({ uploader: id });
  return userVideos;
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
  const imageString = image.destination.replace("public/", "") + image.filename;
  const videoString = video.destination.replace("public/", "") + video.filename;
  const newVideo = new Video({
    id,
    image: imageString,
    video: videoString,
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
const updateUserVideo = async (
  id,
  pid,
  newLikes
) => {
  const newVideo = await Video.findById(pid);
  const newUser = await getUser(id);
  if (!newVideo) return null;
  if(newLikes) newVideo.likes = newLikes;
  await newVideo.save();
  newUser.videoIdListLiked = [...newUser.videoIdListLiked, pid];
  await newUser.save();
  return newVideo;
};
const updateUserLikeVideo = async (
  id,
  pid,
  image,
  video,
  title,
  duration,
  description
) => {
  const newVideo = await getUserVideo(id, pid);
  if (!newVideo) return null;
  if(image) newVideo.image = image.destination.replace("public/", "") + image.filename;
  if(video) newVideo.video = video.destination.replace("public/", "") + video.filename;
  if(duration) newVideo.duration = duration;
  if(title) newVideo.title = title;
  if(description) newVideo.description = description;
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
  upload,
  updateUserLikeVideo
};
