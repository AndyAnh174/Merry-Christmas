export const updateOGTags = (imageUrl) => {
  // Update OG meta tags
  document.querySelector('meta[property="og:image"]').setAttribute('content', imageUrl);
  document.querySelector('meta[property="og:title"]').setAttribute('content', 'Thiệp Giáng Sinh 2024');
  document.querySelector('meta[property="og:description"]').setAttribute('content', 'Gửi lời chúc Giáng sinh đến những người thân yêu ❤️');
}; 