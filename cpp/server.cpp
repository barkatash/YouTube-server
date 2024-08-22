#include <iostream>
#include <thread>
#include <vector>
#include <cstring>
#include <sys/socket.h>
#include <netinet/in.h>
#include <unistd.h>
#include <mutex>
#include <sstream>
#include "json.hpp"

using json = nlohmann::json;
using namespace std;

mutex coutMutex;
mutex dataMutex;

unordered_map<string, vector<string>> userWatchedVideos;
unordered_map<string, int> videoPopularity;

void handle_client(int client_sock) {
    string buffer;
    char temp_buffer[4096];
    while (true) {
        memset(temp_buffer, 0, sizeof(temp_buffer));
        int read_bytes = recv(client_sock, temp_buffer, sizeof(temp_buffer) - 1, 0);
        if (read_bytes <= 0) {
            close(client_sock);
            return;
        }

        buffer.append(temp_buffer, read_bytes);

        size_t start_pos = buffer.find('{');
        while (start_pos != string::npos) {
            size_t end_pos = buffer.find('}', start_pos);
            if (end_pos == string::npos) {
                break;
            }

            end_pos++;
            string json_str = buffer.substr(start_pos, end_pos - start_pos);
            buffer.erase(0, end_pos);
            cerr << "Received JSON data: " << json_str << endl;

            try {
                json receivedData = json::parse(json_str);

                if (receivedData.contains("userId") && receivedData.contains("videoId") &&
                    receivedData.contains("videoList") && receivedData.contains("userList")) {

                    string userId = receivedData["userId"];
                    string videoId = receivedData["videoId"];
                    auto videoList = receivedData["videoList"];
                    auto userList = receivedData["userList"];

                    lock_guard<mutex> lock(dataMutex);
                    userWatchedVideos[userId].push_back(videoId);

                    videoPopularity[videoId]++;
                    vector<pair<string, int>> recommendations;
                    for (const auto& video : videoList) {
                        if (videoPopularity.find(video) != videoPopularity.end()) {
                            recommendations.push_back({video, videoPopularity[video]});
                        }
                    }

                    sort(recommendations.begin(), recommendations.end(), [](const auto& a, const auto& b) {
                        return a.second > b.second;
                    });

                    vector<string> recommendedVideos;
                    for (const auto& rec : recommendations) {
                        if (recommendedVideos.size() >= 10) break;
                        recommendedVideos.push_back(rec.first);
                    }

                    vector<string> allVideos = {"video1", "video2", "video3", "video4", "video5", "video6", "video7", "video8", "video9", "video10"};
                    while (recommendedVideos.size() < 10) {
                        auto randomVideo = allVideos[rand() % allVideos.size()];
                        if (find(recommendedVideos.begin(), recommendedVideos.end(), randomVideo) == recommendedVideos.end()) {
                            recommendedVideos.push_back(randomVideo);
                        }
                    }

                    stringstream ss;
                    for (const auto& rec : recommendedVideos) {
                        ss << rec << ";";
                    }
                    string recommendationsStr = ss.str();
                    int sent_bytes = send(client_sock, recommendationsStr.c_str(), recommendationsStr.size(), 0);
                    if (sent_bytes < 0) {
                        perror("Error sending to client");
                    }

                } else {
                    cerr << "Received JSON data does not contain expected fields" << endl;
                }

            } catch (json::parse_error& e) {
                cerr << "JSON Parse Error: " << e.what() << endl;
                // Log the problematic data
                cerr << "Problematic JSON data: " << json_str << endl;
                buffer.clear();
            } catch (json::type_error& e) {
                cerr << "JSON Type Error: " << e.what() << endl;
                // Log the problematic data
                cerr << "Problematic JSON data: " << json_str << endl;
                buffer.clear();
            }
            start_pos = buffer.find('{');
        }
    }
}

int main() {
    const int server_port = 5555;
    int sock = socket(AF_INET, SOCK_STREAM, 0);
    if (sock < 0) {
        perror("Error creating socket");
        return -1;
    }

    struct sockaddr_in sin;
    memset(&sin, 0, sizeof(sin));
    sin.sin_family = AF_INET;
    sin.sin_addr.s_addr = INADDR_ANY;
    sin.sin_port = htons(server_port);

    if (bind(sock, (struct sockaddr *)&sin, sizeof(sin)) < 0) {
        perror("Error binding socket");
        return -1;
    }

    if (listen(sock, 5) < 0) {
        perror("Error listening to socket");
        return -1;
    }

    vector<thread> threads;
    while (true) {
        struct sockaddr_in client_sin;
        unsigned int addr_len = sizeof(client_sin);
        int client_sock = accept(sock, (struct sockaddr *)&client_sin, &addr_len);
        if (client_sock < 0) {
            perror("Error accepting client");
            continue;
        }
        threads.push_back(thread(handle_client, client_sock));
    }

    for (auto& t : threads) {
        if (t.joinable()) {
            t.join();
        }
    }

    close(sock);
    return 0;
}
