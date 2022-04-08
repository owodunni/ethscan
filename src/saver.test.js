const code = require("./__test__/code");
const { saver } = require("./saver");
const fs = require("fs");
const os = require("os");
const path = require("path");

let tmpDir;
beforeAll(() => {
  tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "ethscan"));
});

afterAll(() => {
  if (tmpDir) {
    fs.rmSync(tmpDir, { recursive: true });
  }
});

test("format", async () => {
  const sources = saver.format(code.sources);
  expect(sources.length).toStrictEqual(11);
});

test("format and save", async () => {
  await saver.save(tmpDir, saver.format(code.sources));
  const files = fs.readdirSync(tmpDir);
  expect(files.length).toStrictEqual(2);
});
