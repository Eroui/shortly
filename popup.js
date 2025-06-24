// DOM elements
const prefixInput = document.getElementById('prefix');
const savePrefixBtn = document.getElementById('savePrefix');
const shortKeyInput = document.getElementById('shortKey');
const targetUrlInput = document.getElementById('targetUrl');
const addLinkBtn = document.getElementById('addLink');
const linksList = document.getElementById('linksList');
const usageExample = document.getElementById('usageExample');

// Default prefix
const DEFAULT_PREFIX = 'go';

// Initialize popup
document.addEventListener('DOMContentLoaded', async () => {
    await loadSettings();
    await loadShortLinks();
    setupEventListeners();
});

// Load saved settings
async function loadSettings() {
    const settings = await chrome.storage.sync.get(['prefix']);
    const prefix = settings.prefix || DEFAULT_PREFIX;
    prefixInput.value = prefix;
    updateUsageExample(prefix);
}

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
    
    linkItem.innerHTML = `
        <div class="link-info">
            <div class="link-key">${key}</div>
            <div class="link-url">${url}</div>
        </div>
        <button class="btn btn-danger" data-key="${key}">Delete</button>
    `;
    
    // Add delete functionality
    const deleteBtn = linkItem.querySelector('.btn-danger');
    deleteBtn.addEventListener('click', () => deleteShortLink(key));
    
    return linkItem;
}

// Update usage example
function updateUsageExample(prefix) {
    usageExample.textContent = `${prefix}/mylink`;
}

// Setup event listeners
function setupEventListeners() {
    // Save prefix
    savePrefixBtn.addEventListener('click', savePrefix);
    
    // Add short link
    addLinkBtn.addEventListener('click', addShortLink);
    
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

// Save prefix
async function savePrefix() {
    const prefix = prefixInput.value.trim();
    
    if (!prefix) {
        alert('Please enter a prefix');
        return;
    }
    
    // Validate prefix (alphanumeric and hyphens only)
    if (!/^[a-zA-Z0-9-]+$/.test(prefix)) {
        alert('Prefix can only contain letters, numbers, and hyphens');
        return;
    }
    
    await chrome.storage.sync.set({ prefix });
    updateUsageExample(prefix);
    
    // Show success feedback
    savePrefixBtn.textContent = 'Saved!';
    setTimeout(() => {
        savePrefixBtn.textContent = 'Save Prefix';
    }, 2000);
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