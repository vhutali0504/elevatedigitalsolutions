export default function sitemap() {
  return [
    {
      url: 'https://elevate-digitalsolutions.co.za',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: 'https://elevate-digitalsolutions.co.za/#services',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: 'https://elevate-digitalsolutions.co.za/#contact',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.7,
    },
  ]
}