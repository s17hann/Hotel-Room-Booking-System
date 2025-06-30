const nextConfig = {
  reactStrictMode: true,
  compiler: {
    styledComponents: true
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    domains: [
      'images.unsplash.com',
      'res.cloudinary.com',
      'localhost',
      '127.0.0.1'
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**'
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/**'
      }
    ]
  },
  publicRuntimeConfig: {
    // Will be available on both server and client
    API_BASE_URL: process.env.API_BASE_URL || 'http://localhost:5001'
  }
};

module.exports = nextConfig;
