const net = require('net');

const connectToCppServer = (message, callback) => {
  return new Promise((resolve, reject) => {
    const host = '127.0.0.1';
    const port = 5555;
    const client = new net.Socket();

    client.connect(port, host, () => {
      console.log('Connected to C++ server');
      client.write(message);
    });

    client.on('data', (data) => {
      const recommendations = data.toString().split(';');
      console.log('Recommended videos:', recommendations);

      resolve(recommendations);
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
