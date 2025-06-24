# Shortly - Custom URL Shortener Chrome Extension

Shortly is a Chrome extension that lets you create custom short links with a configurable prefix. Type your prefix, press <kbd>Tab</kbd>, then your short key to instantly redirect to your saved URLs.

## Features

- **Custom Prefix**: Set your own prefix (default: `go`)
- **Easy Management**: Add, edit, and delete short links through a simple popup interface
- **Sync Storage**: All mappings are stored in Chrome's sync storage
- **Instant Redirects**: Use the Omnibox (address bar) for fast navigation
- **Modern UI**: Clean, responsive design

## Installation

1. **Clone or Download** this repository
2. Open Chrome and go to `chrome://extensions/`
3. Enable **Developer mode** (top right)
4. Click **Load unpacked** and select the extension folder
5. The "Shortly" extension will appear in your extensions list

## Usage

### Setting Up Short Links
1. Click the Shortly extension icon in your Chrome toolbar
2. Set your preferred prefix (default is `go`)
3. Add a short key (e.g., `mylink`) and a target URL (e.g., `https://example.com`)
4. Click **Add Link**

### Using Your Short Links
- In the address bar, type your prefix (e.g., `go`), press <kbd>Tab</kbd>, then your short key (e.g., `mylink`), and press <kbd>Enter</kbd>.
- Example: `go` <kbd>Tab</kbd> `github` <kbd>Enter</kbd> will redirect to your saved GitHub URL.

## File Structure

```
shortly/
├── manifest.json          # Extension manifest
├── background.js          # Background service worker
├── popup.html             # Popup interface
├── popup.css              # Popup styles
├── popup.js               # Popup functionality
├── icons/                 # Extension icons
└── README.md              # This file
```

## Permissions
- `storage`: Save your short links and settings
- `omnibox`: Use the address bar for quick navigation
- `tabs`: Redirect and open new tabs

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for improvements or bug fixes.

## License

MIT License. See [LICENSE](LICENSE) for details. 