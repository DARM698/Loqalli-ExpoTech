import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    // ESTO CORRIGE EL ERROR DE QUALITY 100
    qualities: [75, 100], 
    
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'tzvrcnlwpqmwwdmdethl.supabase.co',
        port: '',
        pathname: '/storage/v1/object/public/**',
      },
      {
        protocol: 'https',
        hostname: 'www.gravatar.com',
        port: '',
        pathname: '/avatar/**',
      },

      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      }
    ],
 
  },
};


export default nextConfig;
