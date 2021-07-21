const axios = require("axios");
const cheerio = require("cheerio");
const keyword = "apple";

axios
  .get(
    `https://search.naver.com/search.naver?sm=tab_hty.top&where=nexearch&query=${keyword}`
  )
  .then(({ data }) => {
    let $ = cheerio.load(data);
    let wrappers = $(".bx").children(".total_wrap");
    for (let i = 0; i < 3; i++) {
      console.log(`--------------결과${i + 1}--------------`);
      console.log("제목: ", $(wrappers[i]).find(".source_box a").attr("href"));
      console.log("링크: ", $(wrappers[i]).find(".total_tit a").text());
      console.log("미리보기: ", $(wrappers[i]).find(".api_txt_lines").text());
    }
  });
