import type { NextConfig } from "next";
import path from 'node:path';
import { glob } from 'glob';
import  { PurgeCSSPlugin } from 'purgecss-webpack-plugin';

// Paths to your components and pages
const PATHS = {
  src: path.join(__dirname, 'src/app'), // Adjust this if your files are elsewhere
};

const getAllFiles = (pattern: string) => glob.sync(pattern, { nodir: true });

const nextConfig: NextConfig = {
  webpack(config, { isServer }) {
    if (!isServer && process.env.NODE_ENV === 'production') {
      config.plugins.push(
        // new PurgeCSSPlugin({
        //   paths: getAllFiles(`${PATHS.src}/**/*.{js,jsx,ts,tsx,html}`),
        //   safelist: ['html', 'body'],
        //   blocklist: []
        // })
    );
    }
    return config;
}
};

export default nextConfig;
