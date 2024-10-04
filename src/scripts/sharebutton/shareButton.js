var _a, _b, _c, _d;
// Define the share URLs for each platform
var shareUrls = {
    whatsapp: function (url) {
        return "https://api.whatsapp.com/send?text=".concat(encodeURIComponent(url));
    },
    twitter: function (url) {
        return "https://twitter.com/share?url=".concat(encodeURIComponent(url));
    },
    facebook: function (url) {
        return "https://www.facebook.com/sharer/sharer.php?u=".concat(encodeURIComponent(url));
    },
    linkedin: function (url) {
        return "https://www.linkedin.com/shareArticle?mini=true&url=".concat(encodeURIComponent(url));
    },
};
// Get the current page URL
var pageUrl = window.location.href;
// Event listener for WhatsApp share
(_a = document.getElementById("share-whatsapp")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", function () {
    window.open(shareUrls.whatsapp(pageUrl), "_blank");
});
// Event listener for Twitter share
(_b = document.getElementById("share-twitter")) === null || _b === void 0 ? void 0 : _b.addEventListener("click", function () {
    window.open(shareUrls.twitter(pageUrl), "_blank");
});
// Event listener for Facebook share
(_c = document.getElementById("share-facebook")) === null || _c === void 0 ? void 0 : _c.addEventListener("click", function () {
    window.open(shareUrls.facebook(pageUrl), "_blank");
});
// Event listener for LinkedIn share
(_d = document.getElementById("share-linkedin")) === null || _d === void 0 ? void 0 : _d.addEventListener("click", function () {
    window.open(shareUrls.linkedin(pageUrl), "_blank");
});
