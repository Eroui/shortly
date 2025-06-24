# Quick Installation Guide

## Step 1: Generate Icons (Required)

1. Open `generate_icons.html` in your web browser
2. Right-click on each canvas and "Save image as..." to download:
   - `icon16.png` (16x16 pixels)
   - `icon48.png` (48x48 pixels) 
   - `icon128.png` (128x128 pixels)
3. Move these files to the `icons/` folder

## Step 2: Load Extension in Chrome

1. Open Chrome and go to `chrome://extensions/`
2. Enable "Developer mode" in the top right corner
3. Click "Load unpacked" and select this folder
4. The "Shortly" extension should now appear in your extensions list

## Step 3: Set Up Your First Short Link

1. Click the Shortly extension icon in your Chrome toolbar
2. Set your preferred prefix (default is "go")
3. Add a short key (e.g., "github")
4. Enter the target URL (e.g., "https://github.com")
5. Click "Add Link"

## Step 4: Test Your Short Link

Type `go/github` (or your custom prefix) in your browser's address bar and press Enter. It should redirect to your target URL!

## Troubleshooting

- If the extension doesn't work, make sure you've generated and placed the icon files in the `icons/` folder
- Check that the extension is enabled in `chrome://extensions/`
- Try refreshing the extension if you make changes to the code 