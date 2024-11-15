export interface ShareUrls {
  whatsapp: string;
  twitter: string;
  facebook: string;
  linkedin: string;
}

export const generateShareUrls = (url: string): ShareUrls => {
  return {
    whatsapp: `https://api.whatsapp.com/send?text=${encodeURIComponent(url)}`,
    twitter: `https://twitter.com/share?url=${encodeURIComponent(url)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    linkedin: `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}`,
  };
};
