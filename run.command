#!/bin/bash
# Double-click this file in Finder to start the local server and open the webpage.
cd "$(dirname "$0")"
echo "Starting HTTP server at http://localhost:8000"
python3 -m http.server 8000 >/dev/null 2>&1 &
SERVER_PID=$!
open "http://localhost:8000/index.html"
echo "Server PID: $SERVER_PID"
echo "Press Enter to stop the server..."
read -r
kill "$SERVER_PID"
echo "Server stopped"
