const net = require('net');

const connectToCppServer = (userId, videoId, videoList, userList) => {
  return new Promise((resolve, reject) => {
    const host = '127.0.0.1';
    const port = 5555;
    const client = new net.Socket();

    client.connect(port, host, () => {
      console.log('Connected to C++ server');
      const payload = {
        userId,
        videoId,
        videoList,
        userList
      };
      const jsonData = JSON.stringify(payload);
      console.log(jsonData);
      client.write(jsonData + '\n'); 
    });

    client.on('data', (data) => {
      const response = data.toString().split(';');
      if (response.length > 0) {
        const recommendations = response;
        console.log('Recommended videos:', recommendations);

        resolve(recommendations);
      } else {
        reject(new Error('No recommendations received'));
      }
      client.destroy();
    });

    client.on('error', (err) => {
      console.error('Error:', err.message);
      reject(new Error('Failed to connect to C++ server'));
    });

    client.on('close', () => {
      console.log('Connection to C++ server closed');
    });
  });
};

module.exports = { connectToCppServer };
