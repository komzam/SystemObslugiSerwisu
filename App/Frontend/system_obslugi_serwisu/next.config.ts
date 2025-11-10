import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const nextConfig: NextConfig = {
    images:{
        remotePatterns: [
            {
                protocol: "http",
                hostname: "host.docker.internal",
                port: "9000",
                pathname: "**"
            }
        ]
    }
  /* config options here */
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
