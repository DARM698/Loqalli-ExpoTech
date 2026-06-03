import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb', // Puedes ajustar este valor según lo necesites
    },
  },
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
    ],
  },
};

export default nextConfig;