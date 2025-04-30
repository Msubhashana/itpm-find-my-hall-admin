module.exports = {
    sonar: {
      host: {
        url: 'http://localhost:9000',
      },
      projectKey: 'ITPM-Find-My-Hall',
      projectName: 'ITPM-Find My Hall',
      sources: ['C:\fmhv2\fmhweb\backend\models', 'C:\fmhv2\fmhweb\backend\routes', 'C:\fmhv2\fmhweb\frontend\admin-panel\src'], // Paths to both frontend & backend
      exclusions: [
        'frontend/node_modules/**',
        'backend/node_modules/**',
        '**/*.spec.js', // Exclude test files
      ],
      javascript: {
        lcov: {
          reportPaths: ['frontend/coverage/lcov.info', 'backend/coverage/lcov.info'],
        },
      },
    },
  };