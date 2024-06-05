/** @type {import('next').NextConfig} */
import withVideos from "next-videos";

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/**",
      },
      { protocol: "https", hostname: "utfs.io", port: "", pathname: "/**" },
    ],
  },
};

export default {
  ...nextConfig,
  ...withVideos(),
};
