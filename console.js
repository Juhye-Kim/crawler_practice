const readline = require("readline");
const crawler = require("./crawler");
const cache = require("./cache");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.on("line", async (keyword) => {
  let [hitIdx, isHit, datalist] = await cache.get(keyword);
  if (keyword !== "$cache") {
    if (!isHit) {
      let result = await crawler(keyword);
      print(keyword, result);
      cache.set(isHit, hitIdx, keyword, result);
    } else {
      console.log("캐시에서 데이터를 가져옵니다");
      print(keyword, datalist);
      cache.set(isHit, hitIdx, keyword);
    }
  }
}).on("close", () => {
  process.exit();
});

function print(keyword, data) {
  for (let i = 0; i < data.length; i++) {
    let [title, link, desc] = data[i];
    console.log(`--------------${keyword} 검색결과 ${
      i + 1
    }--------------\n제목: ${title}\n링크: ${link}\n미리보기: ${desc}
    `);
  }
}
