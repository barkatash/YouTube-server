// models.hpp
#ifndef MODELS_HPP
#define MODELS_HPP

#include "json.hpp"
#include <vector>
#include <string>

using json = nlohmann::json;
using namespace std;

struct Video {
    string _id;
    int id;
    string image;
    string video;
    string title;
    string uploader;
    string duration;
    int visits;
    string uploadDate;
    string description;
    int likes;
    vector<int> categoryId;

    // To support JSON parsing
    NLOHMANN_DEFINE_TYPE_INTRUSIVE(Video, _id, id, image, video, title, uploader, duration, visits, uploadDate, description, likes, categoryId)
};

struct User {
    string _id;
    string username;
    string displayName;
    string password;
    vector<string> videoIdListLiked;
    vector<string> videoIdListUnliked;
    vector<string> commentIdListLiked;
    vector<string> commentIdListUnliked;
    string image;
    int __v;
    vector<string> watchedVideosIdList;

    // To support JSON parsing
    NLOHMANN_DEFINE_TYPE_INTRUSIVE(User, _id, username, displayName, password, videoIdListLiked, videoIdListUnliked, commentIdListLiked, commentIdListUnliked, image, __v, watchedVideosIdList)
};

#endif // MODELS_HPP
