#!/bin/bash

# Start backend in the background on port 5000
cd /app/server
node index.js &

# Start frontend on port 7860 (and proxy /api to 5000)
cd /app/client
npm start -- -p 7860
