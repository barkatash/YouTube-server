#include <iostream>
#include <thread>
#include <vector>
#include <cstring>
#include <sys/socket.h>
#include <netinet/in.h>
#include <unistd.h>
#include <mutex>
#include <sstream>
#include <unordered_map>
#include <algorithm>
#include "json.hpp"
#include "models.hpp"

using json = nlohmann::json;
using namespace std;

mutex coutMutex;
mutex dataMutex;

unordered_map<string, vector<string>> userWatchedVideos;
unordered_map<string, int> videoPopularity;

vector<string> get_random_videos(const vector<Video> &videoList, int count) {
    vector<string> videoIds;
    for (const auto &video : videoList) {
        videoIds.push_back(video._id);
    }

    vector<string> randomVideos;
    if (videoIds.size() <= count) {
        return videoIds;
    }

    while (randomVideos.size() < count) {
        auto randomVideo = videoIds[rand() % videoIds.size()];
        if (find(randomVideos.begin(), randomVideos.end(), randomVideo) == randomVideos.end()) {
            randomVideos.push_back(randomVideo);
        }
    }
    return randomVideos;
}

vector<string> get_recommendations(const vector<User> &userList, const string &userId, const vector<Video> &videoList, int requiredCount) {
    unordered_map<string, int> videoMatchCount;
    vector<string> recommendedVideos;
    vector<string> currentUserWatchedVideos = userWatchedVideos[userId];
    
    if (userId.length() <= 0) {
        vector<string> videoIds = get_random_videos(videoList, requiredCount - recommendedVideos.size());
        recommendedVideos.insert(recommendedVideos.end(), videoIds.begin(), videoIds.end());
        return recommendedVideos;
    }
    
    for (const auto &user : userList) {
        string otherUserId = user.username;
        if (otherUserId != userId) {
            auto watchedVideos = user.watchedVideosIdList;
            int matchCount = 0;
            for (const auto &videoId : watchedVideos) {
                if (find(currentUserWatchedVideos.begin(), currentUserWatchedVideos.end(), videoId) != currentUserWatchedVideos.end()) {
                    matchCount++;
                }
            }

            if (matchCount >= 3) {
                for (const auto &videoId : watchedVideos) {
                    if (find(currentUserWatchedVideos.begin(), currentUserWatchedVideos.end(), videoId) == currentUserWatchedVideos.end()) {
                        videoMatchCount[videoId]++;
                    }                
                }
            }
        }
    }

    unordered_map<string, int> videoIdToVisitCount;
    for (const auto &video : videoList) {
        videoIdToVisitCount[video._id] = video.visits;
    }
    vector<pair<string, int>> sortedVideos;
    for (const auto &entry : videoMatchCount) {
        sortedVideos.push_back({entry.first, videoIdToVisitCount[entry.first]});
    }
    sort(sortedVideos.begin(), sortedVideos.end(), [](const auto &a, const auto &b) {
        if (a.second != b.second) {
            return a.second > b.second;
        }
        return a.first > b.first;
    });

    for (const auto &video : sortedVideos) {
        if (recommendedVideos.size() >= requiredCount)
            break;
        recommendedVideos.push_back(video.first);
    }

    if (recommendedVideos.size() < requiredCount) {
        vector<string> videoIds = get_random_videos(videoList, requiredCount - recommendedVideos.size());
        recommendedVideos.insert(recommendedVideos.end(), videoIds.begin(), videoIds.end());
    }


    return recommendedVideos;
}

void handle_client(int client_sock)
{
    string received_data;
    char buffer[1024];
    ssize_t bytes_received;

    while ((bytes_received = read(client_sock, buffer, sizeof(buffer) - 1)) > 0)
    {
        buffer[bytes_received] = '\0';
        received_data += buffer;
        if (received_data.find("\n") != string::npos)
        {
            break;
        }
    }

    if (bytes_received < 0)
    {
        perror("Error reading from socket");
        close(client_sock);
        return;
    }
    try
    {
        json j = json::parse(received_data);

        string userId = j["userId"].get<string>();
        vector<Video> videoList = j["videoList"].get<vector<Video>>();
        vector<User> userList = j["userList"].get<vector<User>>();

        userWatchedVideos.clear();
        for (const auto &user : userList)
        {
            string id = user.username;
            vector<string> watchedVideos = user.watchedVideosIdList;
            userWatchedVideos[id] = watchedVideos;
        }
        vector<string> recommendations = get_recommendations(userList, userId, videoList, 10);

        stringstream response;
        for (size_t i = 0; i < recommendations.size(); ++i) {
            if (i > 0) response << ";";
            response << recommendations[i];
        }
        string response_str = response.str();
        write(client_sock, response_str.c_str(), response_str.length());

    }
    catch (json::exception &e)
    {
        cerr << "JSON Parsing Error: " << e.what() << endl;
        string error_response = "Error processing request";
        write(client_sock, error_response.c_str(), error_response.length());
    }

    close(client_sock);
}

int main()
{
    const int server_port = 3333;
    int sock = socket(AF_INET, SOCK_STREAM, 0);
    if (sock < 0)
    {
        perror("Error creating socket");
        return -1;
    }

    sockaddr_in sin;
    memset(&sin, 0, sizeof(sin));
    sin.sin_family = AF_INET;
    sin.sin_addr.s_addr = INADDR_ANY;
    sin.sin_port = htons(server_port);

    if (bind(sock, (struct sockaddr *)&sin, sizeof(sin)) < 0)
    {
        perror("Error binding socket");
        return -1;
    }

    if (listen(sock, 5) < 0)
    {
        perror("Error listening to socket");
        return -1;
    }
    vector<thread> threads;
    while (true)
    {
        sockaddr_in client_sin;
        unsigned int addr_len = sizeof(client_sin);
        int client_sock = accept(sock, (struct sockaddr *)&client_sin, &addr_len);
        if (client_sock < 0)
        {
            perror("Error accepting client");
            continue;
        }
        threads.push_back(thread(handle_client, client_sock));
    }

    for (auto &t : threads)
    {
        if (t.joinable())
        {
            t.join();
        }
    }

    close(sock);
    return 0;
}