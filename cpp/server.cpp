#include <iostream>
#include <thread>
#include <vector>
#include <cstring>
#include <sys/socket.h>
#include <netinet/in.h>
#include <unistd.h>
#include <mutex>

using namespace std;

mutex coutMutex;

void handle_client(int client_sock) {
    char buffer[4096];
    while (true) {
        memset(buffer, 0, sizeof(buffer));
        int read_bytes = recv(client_sock, buffer, sizeof(buffer), 0);
        if (read_bytes <= 0) {
            close(client_sock);
            return;
        }
        
        {
            lock_guard<mutex> lock(coutMutex);
            cout << "Received from client: " << buffer << endl;
        }
        string recommendations = "video1;video2;video3;video4;video5";
        int sent_bytes = send(client_sock, recommendations.c_str(), recommendations.size(), 0);
        if (sent_bytes < 0) {
            perror("Error sending to client");
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
