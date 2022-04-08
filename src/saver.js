const fs = require("fs");
const path = require("path");

exports.saver = {
  format: (sources) => {
    const paths = Object.keys(sources);
    return paths.map((p) => {
      const source = sources[p];
      source.path = p;
      return source;
    });
  },
  save: (outDir, sources) => {
    const fileSavings = [];
    sources.forEach((source) => {
      fileSavings.push(
        new Promise((resolve, reject) => {
          const outPath = `${outDir}/${source.path}`;
          const dir = path.parse(outPath).dir;
          if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
          }
          fs.writeFile(outPath, source.content, (err) => {
            if (err) reject(err);
            else resolve();
          });
        })
      );
    });
    return Promise.all(fileSavings);
  },
};
