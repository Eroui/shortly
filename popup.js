// DOM elements
const shortKeyInput = document.getElementById('shortKey');
const targetUrlInput = document.getElementById('targetUrl');
const addLinkBtn = document.getElementById('addLink');
const linksList = document.getElementById('linksList');
const usageExample = document.getElementById('usageExample');
const useCurrentUrlBtn = document.getElementById('useCurrentUrl');

// Default prefix
const DEFAULT_PREFIX = 'go';

// Initialize popup
document.addEventListener('DOMContentLoaded', async () => {
    await loadShortLinks();
    setupEventListeners();
});

// Load and display short links
async function loadShortLinks() {
    const settings = await chrome.storage.sync.get(['shortLinks']);
    const shortLinks = settings.shortLinks || {};
    
    if (Object.keys(shortLinks).length === 0) {
        linksList.innerHTML = `
            <div class="empty-state">
                <p>No short links yet.</p>
                <p>Add your first short link above!</p>
            </div>
        `;
        return;
    }
    
    linksList.innerHTML = '';
    
    Object.entries(shortLinks).forEach(([key, url]) => {
        const linkItem = createLinkItem(key, url);
        linksList.appendChild(linkItem);
    });
}

// Create a link item element
function createLinkItem(key, url) {
    const linkItem = document.createElement('div');
    linkItem.className = 'link-item';
    
    // Create link info container
    const linkInfo = document.createElement('div');
    linkInfo.className = 'link-info';
    
    // Create and set link key (safe - already validated)
    const linkKey = document.createElement('div');
    linkKey.className = 'link-key';
    linkKey.textContent = key;
    
    // Create and set link URL (safe - using textContent prevents XSS)
    const linkUrl = document.createElement('div');
    linkUrl.className = 'link-url';
    linkUrl.textContent = url;
    
    // Assemble link info
    linkInfo.appendChild(linkKey);
    linkInfo.appendChild(linkUrl);
    
    // Create delete button
    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'btn btn-danger';
    deleteBtn.textContent = 'Delete';
    deleteBtn.dataset.key = key;
    deleteBtn.addEventListener('click', () => deleteShortLink(key));
    
    // Assemble link item
    linkItem.appendChild(linkInfo);
    linkItem.appendChild(deleteBtn);
    
    return linkItem;
}

// Update usage example
function updateUsageExample() {
    usageExample.textContent = `go/mylink`;
}

// Setup event listeners
function setupEventListeners() {
    // Add short link
    addLinkBtn.addEventListener('click', addShortLink);
    // Use current URL
    useCurrentUrlBtn.addEventListener('click', async () => {
        // Get the current active tab's URL
        chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
            if (tabs && tabs[0] && tabs[0].url) {
                targetUrlInput.value = tabs[0].url;
            }
        });
    });
    // Enter key support
    shortKeyInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            targetUrlInput.focus();
        }
    });
    targetUrlInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addShortLink();
        }
    });
}

// Add short link
async function addShortLink() {
    const shortKey = shortKeyInput.value.trim();
    const targetUrl = targetUrlInput.value.trim();
    
    // Validation
    if (!shortKey) {
        alert('Please enter a short key');
        return;
    }
    
    if (!targetUrl) {
        alert('Please enter a target URL');
        return;
    }
    
    // Validate short key (alphanumeric and hyphens only)
    if (!/^[a-zA-Z0-9-]+$/.test(shortKey)) {
        alert('Short key can only contain letters, numbers, and hyphens');
        return;
    }
    
    // Validate URL format
    try {
        new URL(targetUrl);
    } catch {
        alert('Please enter a valid URL (including http:// or https://)');
        return;
    }
    
    // Get existing short links
    const settings = await chrome.storage.sync.get(['shortLinks']);
    const shortLinks = settings.shortLinks || {};
    
    // Check if key already exists
    if (shortLinks[shortKey]) {
        if (!confirm(`A short link with key "${shortKey}" already exists. Do you want to replace it?`)) {
            return;
        }
    }
    
    // Add new short link
    shortLinks[shortKey] = targetUrl;
    await chrome.storage.sync.set({ shortLinks });
    
    // Clear form
    shortKeyInput.value = '';
    targetUrlInput.value = '';
    
    // Reload links list
    await loadShortLinks();
    
    // Show success feedback
    addLinkBtn.textContent = 'Added!';
    setTimeout(() => {
        addLinkBtn.textContent = 'Add Link';
    }, 2000);
}

// Delete short link
async function deleteShortLink(key) {
    if (!confirm(`Are you sure you want to delete the short link "${key}"?`)) {
        return;
    }
    
    const settings = await chrome.storage.sync.get(['shortLinks']);
    const shortLinks = settings.shortLinks || {};
    
    delete shortLinks[key];
    await chrome.storage.sync.set({ shortLinks });
    
    await loadShortLinks();
} 