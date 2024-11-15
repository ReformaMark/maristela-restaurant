/** @type {import('next').NextConfig} */
const nextConfig = {
    images:{
        remotePatterns: [
            {
              protocol: 'https',
              hostname: 'precise-peccary-273.convex.cloud',
            },
            {
              protocol: 'https',
              hostname: 'lovable-seal-462.convex.cloud',
            
            },
            {
              protocol: 'https',
              hostname: 'successful-robin-887.convex.cloud',
            },
          ],
    }
};

export default nextConfig;
