const fs = require('fs');

const reportPath = process.argv[2];
const report = JSON.parse(fs.readFileSync(reportPath));

for (const notice of report.notices) {
  console.log(notice);
  
  if (notice.severity === 'ERROR') {
    process.exitCode = 1; // Sets process status to 1 (unsuccessful) which triggers a failure in Github Actions
  }
}

