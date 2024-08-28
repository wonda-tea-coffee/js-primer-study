// `node:util`モジュールを、utilオブジェクトとしてインポートする
import * as util from "node:util";
// fs/promisesモジュールをfsオブジェクトとしてインポートする
import * as fs from "node:fs/promises";
import { md2html } from "./md2html.js";

// コマンドライン引数からファイルパスを取得する
const {
  values,
  positionals
} = util.parseArgs({
  allowPositionals: true,
  options: {
    gfm: {
      type: "boolean",
      default: false,
    }
  }
});

const filePath = positionals[0];
// ファイルを非同期で読み込む
fs.readFile(filePath, { encoding: "utf8" }).then(file => {
  console.log(md2html(file, values));
}).catch(err => {
  console.error(err.message);
  // 終了ステータス１（一般的なエラー）としてプロセスを終了する
  process.exit(1);
});
