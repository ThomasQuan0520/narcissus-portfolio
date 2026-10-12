#!/bin/bash
# Run this in a terminal to start the server in foreground (use Ctrl+C to stop)
cd "$(dirname "$0")"
echo "Starting HTTP server at http://localhost:8000 (foreground)"
python3 -m http.server 8000
