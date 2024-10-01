/** @type {import('next').NextConfig} */
const nextConfig = {
    images:{
        remotePatterns: [
            {
              protocol: 'https',
              hostname: 'precise-peccary-273.convex.cloud',
            
            },
          ],
    }
};

export default nextConfig;
