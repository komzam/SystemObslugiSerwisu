import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const nextConfig: NextConfig = {
    images:{
        remotePatterns: [
            {
                protocol: "http",
                hostname: "storage.localhost",
                port: "",
                pathname: "**"
            }
        ]
    }
  /* config options here */
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
