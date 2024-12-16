import fs from 'fs';

const reportPath = process.argv[2];
const summaryStream = fs.createWriteStream(process.argv[3]);
const report = JSON.parse(fs.readFileSync(reportPath));

for (const notice of report.notices) {
  console.log(notice);
  
  if (notice.severity === 'ERROR') {
    process.exitCode = 1; // Sets process status to 1 (unsuccessful) which triggers a failure in Github Actions
  }

  summaryStream.write(`
<details>
<summary>${notice.severity}: ${notice.code} (${notice.totalNotices})</summary>
\`\`\`json
${JSON.stringify(notice.sampleNotices, null, 2)}
\`\`\`
</details>
`);
}

await summaryStream.end();
