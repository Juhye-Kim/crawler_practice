const axios = require("axios");
const cheerio = require("cheerio");

module.exports = async (keyword) => {
  let res = [];
  await axios
    .get(
      `https://search.naver.com/search.naver?sm=tab_hty.top&where=nexearch&query=${keyword}`
    )
    .then(({ data }) => {
      let $ = cheerio.load(data);
      let wrappers = $(".bx").children(".total_wrap");
      for (let i = 0; i < wrappers.length; i++) {
        let title = $(wrappers[i]).find(".total_tit a").text() || "제목없음";
        let link =
          $(wrappers[i]).find(".source_box a").attr("href") || "링크없음";
        let desc =
          $(wrappers[i]).find(".api_txt_lines").text() || "미리보기없음";
        res.push([title, link, desc]);
      }
    });
  return res;
};
