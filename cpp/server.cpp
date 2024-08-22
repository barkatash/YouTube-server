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

vector<string> get_random_videos(const vector<string> &videoList, int count)
{
    vector<string> randomVideos;
    if (videoList.size() <= count)
    {
        return videoList;
    }

    while (randomVideos.size() < count)
    {
        auto randomVideo = videoList[rand() % videoList.size()];
        if (find(randomVideos.begin(), randomVideos.end(), randomVideo) == randomVideos.end())
        {
            randomVideos.push_back(randomVideo);
        }
    }
    return randomVideos;
}

vector<string> get_recommendations(const json &userList, const string &userId, int requiredCount)
{
    unordered_map<string, int> videoMatchCount;
    vector<string> recommendedVideos;

    for (const auto &user : userList)
    {
        string otherUserId = user["id"];
        if (otherUserId != userId)
        {
            auto watchedVideos = user["watchedVideosIdList"].get<vector<string>>();
            int matchCount = 0;
            for (const auto &videoId : watchedVideos)
            {
                if (find(userWatchedVideos[userId].begin(), userWatchedVideos[userId].end(), videoId) != userWatchedVideos[userId].end())
                {
                    matchCount++;
                }
            }

            if (matchCount >= 3)
            {
                for (const auto &videoId : watchedVideos)
                {
                    videoPopularity[videoId]++;
                }
            }
        }
    }

    // Sort videos by popularity
    vector<pair<string, int>> sortedVideos(videoPopularity.begin(), videoPopularity.end());
    sort(sortedVideos.begin(), sortedVideos.end(), [](const auto &a, const auto &b)
         { return a.second > b.second; });

    // Collect the most popular videos
    for (const auto &video : sortedVideos)
    {
        if (recommendedVideos.size() >= requiredCount)
            break;
        recommendedVideos.push_back(video.first);
    }

    // If not enough recommendations, add random videos
    if (recommendedVideos.size() < requiredCount)
    {
        vector<string> videoList = {"video1", "video2", "video3", "video4", "video5", "video6", "video7", "video8", "video9", "video10"};
        vector<string> randomVideos = get_random_videos(videoList, requiredCount - recommendedVideos.size());
        recommendedVideos.insert(recommendedVideos.end(), randomVideos.begin(), randomVideos.end());
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
        string videoId = j["videoId"].get<string>();
        vector<Video> videoList = j["videoList"].get<vector<Video>>();
        vector<User> userList = j["userList"].get<vector<User>>();

        cout << "Received User ID: " << userId << endl;
        cout << "Received Video ID: " << videoId << endl;
        cout << "Received Video List: " << endl;
        for (const auto &video : videoList)
        {
            cout << "Video Title: " << video.title << endl;
        }

        cout << "Received User List: " << endl;
        for (const auto &user : userList)
        {
            cout << "User Display Name: " << user.displayName << endl;
        }
        string response = "Recommendation1;Recommendation2;Recommendation3";
        write(client_sock, response.c_str(), response.length());
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
    const int server_port = 5555;
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