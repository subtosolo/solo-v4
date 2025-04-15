const urlBar = document.querySelector("#urlBar")
const siteUrl = document.querySelector("#siteurl");
const searchInput = document.querySelector("#search");

// Handle URL bar searches
document.querySelector("#search").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        let url = searchInput.value.trim();
        if (!isUrl(url)) {
            url = "https://www.google.com/search?q=" + url;
        } else if (!(url.startsWith("https://") || url.startsWith("http://"))) {
            url = "https://" + url;
        }
        
        const encodedUrl = __uv$config.encodeUrl(url);
        document.querySelector("#siteurl").src = "/service/" + encodedUrl;
    }
});

// Update URL bar when iframe loads
siteUrl.addEventListener("load", function() {
    const currentUrl = this.contentWindow.location.href;
    const decodedUrl = currentUrl.split("/service/")[1];
    if (decodedUrl) {
        searchInput.value = __uv$config.decodeUrl(decodedUrl);
    }
});

function isUrl(val = "") {
    if (/^http(s?):\/\//.test(val) || (val.includes(".") && val.substr(0, 1) !== " ")) {
        return true;
    }
    return false;
}

// Existing button functions
function openWindow() {
    const abFrame = document.getElementById('siteurl');
    const currentSrc = abFrame.contentWindow.location.href;
    window.open(currentSrc, '_blank');
}

function toggleFs() {
    if (!document.fullscreenElement) {
        siteUrl.requestFullscreen();
    } else {
        document.exitFullscreen();
    }
}

function hideBar() {
    urlBar.style.display = 'none';
    siteUrl.style.height = '100vh';
}

function reload() {
    siteUrl.contentWindow.location.reload();
}

function forward() {
    siteUrl.contentWindow.history.go(1);
}

function back() {
    siteUrl.contentWindow.history.go(-1);
}

function exit() {
    location.href = '/';
}

function devTools() {
    const innerDoc = siteUrl.contentDocument || siteUrl.contentWindow.document;
    if (!window.eruda) {
        const script = document.createElement('script');
        script.src = "//cdn.jsdelivr.net/npm/eruda";
        script.onload = () => eruda.init();
        innerDoc.head.appendChild(script);
    } else {
        eruda.destroy();
    }
}
