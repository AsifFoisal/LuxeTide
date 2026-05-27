import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	async rewrites() {
		return {
			beforeFiles: [
				{ source: "/ships", destination: "/fleet" },
				{ source: "/ships/:id", destination: "/fleet/:id" },
				{ source: "/ships/:id/suites", destination: "/fleet/:id/suites" },
				{ source: "/ships/:id/suites/:suite", destination: "/fleet/:id/suites/:suite" },
				{ source: "/ships/:id/food", destination: "/fleet/:id/food" },
			],
		};
	},
};

export default nextConfig;
