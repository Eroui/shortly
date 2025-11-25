# Shortly - Custom URL Shortener Chrome Extension

Shortly is a Chrome extension that lets you create custom short links with a configurable prefix. Type your prefix, press <kbd>Tab</kbd>, then your short key to instantly redirect to your saved URLs.

## Features

- **Quick Access**: Type `go` in the address bar, press <kbd>Tab</kbd>, then your short key for instant redirects
- **Easy Management**: Add, edit, and delete short links through a simple popup interface
- **Use Current URL**: Quickly save the current tab's URL with one click
- **Keyboard Shortcuts**: Navigate the popup efficiently with Enter key support
- **Sync Storage**: All mappings are stored in Chrome's sync storage and sync across devices
- **Instant Redirects**: Use the Omnibox (address bar) for fast navigation
- **Modern UI**: Clean, responsive design

## Installation

1. **Clone or Download** this repository
2. Open Chrome and go to `chrome://extensions/`
3. Enable **Developer mode** (top right)
4. Click **Load unpacked** and select the extension folder
5. The "Shortly" extension will appear in your extensions list

> **Note**: The extension requires icon files to load properly. If icons are missing, see the [INSTALL.md](INSTALL.md) guide for generating them.

## Usage

### Setting Up Short Links
1. Click the Shortly extension icon in your Chrome toolbar
2. Enter a short key (e.g., `github`) - only letters, numbers, and hyphens allowed
3. Enter a target URL (e.g., `https://github.com`) - must include `http://` or `https://`
   - **Tip**: Click **Use Current URL** to auto-fill the current tab's URL
4. Click **Add Link** or press <kbd>Enter</kbd>

### Using Your Short Links
- In the address bar, type `go`, press <kbd>Tab</kbd>, then type your short key (e.g., `github`), and press <kbd>Enter</kbd>
- Example: `go` <kbd>Tab</kbd> `github` <kbd>Enter</kbd> will redirect to your saved GitHub URL

### Editing Short Links
- To update an existing short link, simply add a new link with the same short key
- You'll be prompted to confirm whether you want to replace the existing URL

### Keyboard Shortcuts
- Press <kbd>Enter</kbd> in the "Short Key" field to move to "Target URL"
- Press <kbd>Enter</kbd> in the "Target URL" field to add the link immediately

### Input Requirements
- **Short Keys**: Can only contain letters, numbers, and hyphens (e.g., `my-link`, `github`, `docs2024`)
- **Target URLs**: Must be valid URLs including the protocol (e.g., `https://example.com`, not `example.com`)


## File Structure

```
shortly/
├── manifest.json          # Extension manifest
├── background.js          # Background service worker
├── popup.html             # Popup interface
├── popup.css              # Popup styles
├── popup.js               # Popup functionality
├── icons/                 # Extension icons
│   ├── icon_16.png
│   ├── icon_48.png
│   └── icon_128.png
├── generate_icons.html    # Icon generator tool
├── README.md              # This file
├── INSTALL.md             # Installation guide
└── LICENSE                # MIT License
```

## Permissions
- `storage`: Save your short links and settings
- `omnibox`: Use the address bar for quick navigation
- `tabs`: Redirect and open new tabs

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for improvements or bug fixes.

## License

MIT License. See [LICENSE](LICENSE) for details. 