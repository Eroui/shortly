# Quick Installation Guide

## Step 1: Generate Icons (Required)

The extension requires icon files to display properly in Chrome. You can generate them using the included tool:

1. Open `generate_icons.html` in your web browser
2. Right-click on each canvas and "Save image as..." to download:
   - `icon_16.png` (16x16 pixels)
   - `icon_48.png` (48x48 pixels) 
   - `icon_128.png` (128x128 pixels)
3. Save these files to the `icons/` folder in the extension directory

> **Important**: The filenames must include underscores (e.g., `icon_16.png`, not `icon16.png`) to match the manifest configuration.

## Step 2: Load Extension in Chrome

1. Open Chrome and go to `chrome://extensions/`
2. Enable "Developer mode" in the top right corner
3. Click "Load unpacked" and select this folder
4. The "Shortly" extension should now appear in your extensions list

## Step 3: Set Up Your First Short Link

1. Click the Shortly extension icon in your Chrome toolbar
2. Enter a short key (e.g., `github`)
   - Only letters, numbers, and hyphens are allowed
3. Enter the target URL (e.g., `https://github.com`)
   - Must include `http://` or `https://`
   - **Tip**: Click the **Use Current URL** button to auto-fill the current tab's URL
4. Click **Add Link** or press <kbd>Enter</kbd>

## Step 4: Test Your Short Link

1. In your browser's address bar, type `go` and press <kbd>Tab</kbd>
2. The address bar should show "Shortly" or change appearance
3. Type your short key (e.g., `github`) and press <kbd>Enter</kbd>
4. You should be redirected to your target URL!

## Troubleshooting

- **Extension won't load**: Make sure you've generated and placed the icon files with correct names (`icon_16.png`, `icon_48.png`, `icon_128.png`) in the `icons/` folder
- **Extension not enabled**: Check that the extension is enabled in `chrome://extensions/`
- **Short links not working**: 
  - Make sure you're typing `go` then pressing <kbd>Tab</kbd> (not typing `go/`)
  - Verify your short link was saved by clicking the extension icon
- **Made code changes**: Try refreshing the extension by clicking the refresh icon in `chrome://extensions/`