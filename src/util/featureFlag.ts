// src/config/featureFlags.js

// Important: Please Be aware that this configuration
// will enable or disable webspages and features in the code base.

// Feature Flag for webpage
export const featureFlags = {
  showBlog: true,
  showAbout: true,
  showContact: true,
  showProjects: true,
  showIndex: true,
  showTags: true,
  showSearch: true,
  showNewsletter: true,
  showPrivacy: true,
  showTermsOfService: true,
  showSubNewsletter: true,
  showTrendingPosts: false,
};

// Feature Flag for API calls
export const FeatureFlagsApi = {
  enableNotionAPI: false,
  enableauthorInfoAPI: true,
  enableUmamiServiceAPI: false,
};
