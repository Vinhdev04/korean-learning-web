module.exports = {
  apps: [
    {
      name: 'chips-website-client',
      cwd: '/home/chips_website_v2/client',
      script: 'npm',
      args: 'start',
      exec_mode: 'fork',
      env: {
        NODE_ENV: 'production',
        NEXT_PUBLIC_API_BASE_URL: 'https://chipsweb-uat.chips.com.vn/api/',
        INTERNAL_API_BASE_URL: 'http://127.0.0.1:4004/',
      },
    },
    {
      name: 'chips-website-server',
      cwd: '/home/chips_website_v2/api',
      script: 'index.js',
      interpreter: 'node',
      exec_mode: 'fork',
      env: {
        NODE_ENV: 'production',
        PORT: 4004,
      },
    },
  ],
};
