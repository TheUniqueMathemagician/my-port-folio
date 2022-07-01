const ContentSecurityPolicy = `
  default-src 'self';
  script-src 'self';
  child-src example.com;
  style-src 'self' example.com;
  font-src 'self';
`

/** @type {import('next').NextConfig} */
module.exports = {
	reactStrictMode: true,
	images: {
		domains: ["images.unsplash.com"]
	},
	webpack5: true,
	headers: [
		{
			key: 'X-DNS-Prefetch-Control',
			value: 'on'
		},
		{
			key: 'X-XSS-Protection',
			value: '1; mode=block'
		},
		{
			key: 'Content-Security-Policy',
			value: ContentSecurityPolicy.replace(/\s{2,}/g, ' ').trim()
		},
		{
			key: 'X-Content-Type-Options',
			value: 'nosniff'
		},
		{
			key: 'X-Frame-Options',
			value: 'sameorigin'
		}
	]
}
