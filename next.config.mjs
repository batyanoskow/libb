/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    
      distDir: 'build',
      experimental:{appDir: true}
  }
  

export default nextConfig;
