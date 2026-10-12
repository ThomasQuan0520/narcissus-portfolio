Run the webpage locally

Options:

1) Double-click (macOS Finder) `run.command` (you may need to make it executable once):
   - If not executable, run in Terminal:

```bash
cd /Users/narcissus/Documents/Coding/Illustration Web lite
chmod +x run.command
```

   - Double-click `run.command` to start the server and open the page. When finished press Enter in the Terminal window to stop the server.

2) In Terminal run `run.sh`:

```bash
cd /Users/narcissus/Documents/Coding/Illustration Web lite
chmod +x run.sh
./run.sh
```

3) Manual (recommended during development):

```bash
cd /Users/narcissus/Documents/Coding/Illustration Web lite
python3 -m http.server 8000
# then open http://localhost:8000/index.html
```

Notes:
- Use `Ctrl+S`/`Ctrl+O` within the app to save/load projects.
- If audio or fetch errors occur, run the server method above instead of opening the file directly.
