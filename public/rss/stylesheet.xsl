<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="3.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes"/>
  
  <xsl:template match="/">
    <html lang="en">
      <head>
        <meta charset="UTF-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <title><xsl:value-of select="/rss/channel/title"/> - RSS Feed</title>
        <style>
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            background: linear-gradient(135deg, #1a1b26 0%, #24283b 100%);
            color: #c0caf5;
            line-height: 1.6;
            min-height: 100vh;
            padding: 20px;
          }
          
          .container {
            max-width: 900px;
            margin: 0 auto;
            background: rgba(36, 40, 59, 0.95);
            border-radius: 20px;
            padding: 40px;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
            border: 1px solid rgba(122, 162, 247, 0.2);
            backdrop-filter: blur(20px);
          }
          
          .header {
            text-align: center;
            margin-bottom: 50px;
            padding-bottom: 40px;
            border-bottom: 2px solid rgba(122, 162, 247, 0.3);
            position: relative;
          }
          
          .header::after {
            content: '';
            position: absolute;
            bottom: -2px;
            left: 50%;
            transform: translateX(-50%);
            width: 100px;
            height: 2px;
            background: linear-gradient(90deg, #7aa2f7, #bb9af7, #9ece6a);
            border-radius: 1px;
          }
          
          .site-title {
            font-size: 3rem;
            font-weight: 700;
            background: linear-gradient(135deg, #7aa2f7, #bb9af7);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            margin-bottom: 15px;
            text-shadow: 0 0 30px rgba(122, 162, 247, 0.3);
          }
          
          .site-description {
            font-size: 1.2rem;
            color: #a9b1d6;
            font-weight: 400;
            max-width: 700px;
            margin: 0 auto;
            line-height: 1.7;
          }
          
          .rss-info {
            background: rgba(122, 162, 247, 0.1);
            border: 1px solid rgba(122, 162, 247, 0.2);
            border-radius: 16px;
            padding: 30px;
            margin-bottom: 40px;
            text-align: center;
            position: relative;
            overflow: hidden;
          }
          
          .rss-info::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 3px;
            background: linear-gradient(90deg, #7aa2f7, #bb9af7, #9ece6a);
          }
          
          .rss-info h2 {
            color: #7aa2f7;
            font-size: 1.5rem;
            margin-bottom: 15px;
            font-weight: 600;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 10px;
          }
          
          .rss-info p {
            color: #a9b1d6;
            font-size: 1rem;
            margin-bottom: 20px;
          }
          
          .feed-link {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            background: linear-gradient(135deg, #7aa2f7, #bb9af7);
            color: #1a1b26;
            text-decoration: none;
            padding: 14px 28px;
            border-radius: 12px;
            font-weight: 600;
            font-size: 1rem;
            transition: all 0.3s ease;
            box-shadow: 0 8px 25px rgba(122, 162, 247, 0.3);
            position: relative;
            overflow: hidden;
          }
          
          .feed-link::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
            transition: left 0.5s ease;
          }
          
          .feed-link:hover::before {
            left: 100%;
          }
          
          .feed-link:hover {
            transform: translateY(-3px);
            box-shadow: 0 12px 35px rgba(122, 162, 247, 0.4);
          }
          
          .items {
            display: flex;
            flex-direction: column;
            gap: 30px;
          }
          
          .item {
            opacity: 0;
            transform: translateY(30px);
            animation: slideInUp 0.6s ease forwards;
          }
          
          .item:nth-child(1) { animation-delay: 0.1s; }
          .item:nth-child(2) { animation-delay: 0.2s; }
          .item:nth-child(3) { animation-delay: 0.3s; }
          .item:nth-child(4) { animation-delay: 0.4s; }
          .item:nth-child(5) { animation-delay: 0.5s; }
          .item:nth-child(6) { animation-delay: 0.6s; }
          .item:nth-child(7) { animation-delay: 0.7s; }
          .item:nth-child(8) { animation-delay: 0.8s; }
          .item:nth-child(9) { animation-delay: 0.9s; }
          .item:nth-child(10) { animation-delay: 1.0s; }
          .item:nth-child(11) { animation-delay: 1.1s; }
          .item:nth-child(12) { animation-delay: 1.2s; }
          .item:nth-child(13) { animation-delay: 1.3s; }
          .item:nth-child(14) { animation-delay: 1.4s; }
          .item:nth-child(15) { animation-delay: 1.5s; }
          
          @keyframes slideInUp {
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          
          .item {
            background: rgba(45, 49, 66, 0.7);
            border: 1px solid rgba(86, 95, 137, 0.2);
            border-radius: 16px;
            padding: 30px;
            transition: all 0.4s ease;
            position: relative;
            overflow: hidden;
            cursor: pointer;
          }
          
          .item::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 4px;
            background: linear-gradient(90deg, #7aa2f7, #bb9af7, #9ece6a);
            opacity: 0;
            transition: opacity 0.3s ease;
          }
          
          .item:hover {
            transform: translateY(-4px);
            border-color: rgba(122, 162, 247, 0.5);
            box-shadow: 0 15px 40px rgba(0, 0, 0, 0.3);
            background: rgba(45, 49, 66, 0.9);
          }
          
          .item:hover::before {
            opacity: 1;
          }
          
          .item-title {
            font-size: 1.5rem;
            font-weight: 600;
            color: #7aa2f7;
            margin-bottom: 15px;
            line-height: 1.4;
            transition: color 0.3s ease;
          }
          
          .item-title a {
            color: inherit;
            text-decoration: none;
            transition: color 0.3s ease;
          }
          
          .item:hover .item-title a {
            color: #bb9af7;
          }
          
          .item-description {
            color: #a9b1d6;
            font-size: 1.05rem;
            margin-bottom: 20px;
            line-height: 1.7;
          }
          
          .item-meta {
            display: flex;
            flex-wrap: wrap;
            gap: 20px;
            align-items: center;
            font-size: 0.95rem;
            color: #565f89;
          }
          
          .meta-item {
            display: flex;
            align-items: center;
            gap: 8px;
            padding: 8px 16px;
            background: rgba(86, 95, 137, 0.1);
            border-radius: 20px;
            border: 1px solid rgba(86, 95, 137, 0.2);
            transition: all 0.3s ease;
          }
          
          .meta-item:hover {
            background: rgba(86, 95, 137, 0.2);
            border-color: rgba(86, 95, 137, 0.4);
          }
          
          .meta-icon {
            width: 18px;
            height: 18px;
            fill: currentColor;
          }
          
          .item-date {
            color: #9ece6a;
            font-weight: 500;
          }
          
          .item-author {
            color: #e0af68;
            font-weight: 500;
          }
          
          .read-more {
            color: #7aa2f7;
            font-weight: 500;
            text-decoration: none;
            transition: color 0.3s ease;
          }
          
          .read-more:hover {
            color: #bb9af7;
          }
          
          .footer {
            text-align: center;
            margin-top: 50px;
            padding-top: 40px;
            border-top: 1px solid rgba(86, 95, 137, 0.2);
            color: #565f89;
            font-size: 0.95rem;
          }
          
          .footer a {
            color: #7aa2f7;
            text-decoration: none;
            transition: color 0.3s ease;
          }
          
          .footer a:hover {
            color: #bb9af7;
          }
          
          @media (max-width: 768px) {
            .container {
              padding: 25px;
              margin: 10px;
            }
            
            .site-title {
              font-size: 2.2rem;
            }
            
            .item {
              padding: 25px;
            }
            
            .item-title {
              font-size: 1.3rem;
            }
            
            .meta-item {
              padding: 6px 12px;
              font-size: 0.9rem;
            }
          }
          
          /* Custom scrollbar */
          ::-webkit-scrollbar {
            width: 10px;
          }
          
          ::-webkit-scrollbar-track {
            background: rgba(36, 40, 59, 0.5);
            border-radius: 5px;
          }
          
          ::-webkit-scrollbar-thumb {
            background: linear-gradient(135deg, #7aa2f7, #bb9af7);
            border-radius: 5px;
          }
          
          ::-webkit-scrollbar-thumb:hover {
            background: linear-gradient(135deg, #bb9af7, #9ece6a);
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1 class="site-title"><xsl:value-of select="/rss/channel/title"/></h1>
            <p class="site-description"><xsl:value-of select="/rss/channel/description"/></p>
          </div>
          
          <div class="rss-info">
            <h2>
              📡 RSS Feed
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M6.18 15.64a2.18 2.18 0 0 1 2.18 2.18C8.36 19 7.38 20 6.18 20C5 20 4 19 4 17.82a2.18 2.18 0 0 1 2.18-2.18M6.18 8.36a2.18 2.18 0 0 1 2.18 2.18C8.36 12.27 7.38 13.27 6.18 13.27C5 13.27 4 12.27 4 11.09A2.18 2.18 0 0 1 6.18 8.36M6.18 1.09a2.18 2.18 0 0 1 2.18 2.18C8.36 5.45 7.38 6.45 6.18 6.45C5 6.45 4 5.45 4 4.27A2.18 2.18 0 0 1 6.18 1.09M13.64 15.64a2.18 2.18 0 0 1 2.18 2.18C15.82 19 14.82 20 13.64 20C12.45 20 11.45 19 11.45 17.82a2.18 2.18 0 0 1 2.18-2.18M13.64 8.36a2.18 2.18 0 0 1 2.18 2.18C15.82 12.27 14.82 13.27 13.64 13.27C12.45 13.27 11.45 12.27 11.45 11.09A2.18 2.18 0 0 1 13.64 8.36M13.64 1.09a2.18 2.18 0 0 1 2.18 2.18C15.82 5.45 14.82 6.45 13.64 6.45C12.45 6.45 11.45 5.45 11.45 4.27A2.18 2.18 0 0 1 13.64 1.09"/>
              </svg>
            </h2>
            <p>Stay updated with the latest blog posts, tech insights, and coding adventures. Subscribe to this feed in your favorite RSS reader.</p>
            <a href="/rss.xml" class="feed-link">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
              View Raw RSS Feed
            </a>
          </div>
          
          <div class="items">
            <xsl:for-each select="/rss/channel/item">
              <article class="item">
                <h2 class="item-title">
                  <a href="{link}">
                    <xsl:value-of select="title"/>
                  </a>
                </h2>
                
                <p class="item-description">
                  <xsl:value-of select="description"/>
                </p>
                
                <div class="item-meta">
                  <span class="meta-item item-date">
                    <svg class="meta-icon" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                    </svg>
                    <xsl:value-of select="pubDate"/>
                  </span>
                  
                  <xsl:if test="author">
                    <span class="meta-item item-author">
                      <svg class="meta-icon" viewBox="0 0 24 24">
                        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                      </svg>
                      <xsl:value-of select="author"/>
                    </span>
                  </xsl:if>
                  
                  <span class="meta-item">
                    <svg class="meta-icon" viewBox="0 0 24 24">
                      <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
                    </svg>
                    <a href="{link}" class="read-more">Read Full Post</a>
                  </span>
                </div>
              </article>
            </xsl:for-each>
          </div>
          
          <div class="footer">
            <p>Generated by <a href="https://astro.build">Astro</a> • 
            Subscribe to stay updated with the latest tech content from <xsl:value-of select="/rss/channel/title"/></p>
          </div>
        </div>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>