const express = require('express');
const cors = require('cors');
const app = express();
const corsOptions = {
    origin: 'http://localhost:3001',
}
cors(app)

// Define the /events route
app.get('/events', cors(corsOptions), (req, res) => {
    // Your code to handle the /events request goes here
    res.writeHead(200, {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive'
    })

    // send a message every 5 seconds
    const intervalId = setInterval(() => {
        const data = {
            message: `Hello World ${new Date().toISOString()}`
        }
        console.log('sent: ', data)
        res.write(`data: ${JSON.stringify(data)}\n\n`);
    }, 2000);
});

// Start the server
const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});