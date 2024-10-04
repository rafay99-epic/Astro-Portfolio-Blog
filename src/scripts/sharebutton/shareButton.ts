// Define the share URLs for each platform
const shareUrls = {
  whatsapp: (url: string) =>
    `https://api.whatsapp.com/send?text=${encodeURIComponent(url)}`,
  twitter: (url: string) =>
    `https://twitter.com/share?url=${encodeURIComponent(url)}`,
  facebook: (url: string) =>
    `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
  linkedin: (url: string) =>
    `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}`,
};

// Get the current page URL
const pageUrl = window.location.href;

// Event listener for WhatsApp share
document.getElementById("share-whatsapp")?.addEventListener("click", () => {
  window.open(shareUrls.whatsapp(pageUrl), "_blank");
});

// Event listener for Twitter share
document.getElementById("share-twitter")?.addEventListener("click", () => {
  window.open(shareUrls.twitter(pageUrl), "_blank");
});

// Event listener for Facebook share
document.getElementById("share-facebook")?.addEventListener("click", () => {
  window.open(shareUrls.facebook(pageUrl), "_blank");
});

// Event listener for LinkedIn share
document.getElementById("share-linkedin")?.addEventListener("click", () => {
  window.open(shareUrls.linkedin(pageUrl), "_blank");
});
