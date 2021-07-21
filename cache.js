let cache = [];
let hitCount = 0;
const [cacheSize, resultSize] = [5, 10];

exports.get = (keyword) => {
  if (keyword === "$cache") {
    console.log(
      `키워드 목록: ${
        cache.map((el) => el[0]) || "없음"
      }, hitCount: ${hitCount}`
    );
  } else {
    for (let i = 0; i < cache.length; i++) {
      if (cache[i][0] === keyword) return [i, true, cache[i][1]];
    }
  }
  return [-1, false];
};

exports.set = (isHit, hitIdx, keyword, result) => {
  if (isHit) {
    hitCount++;
    cache = [
      ...cache.slice(0, hitIdx),
      ...cache.slice(hitIdx + 1),
      cache[hitIdx],
    ];
  } else {
    if (cache.length >= cacheSize) cache.shift();
    if (result.length > resultSize) result = result.slice(0, resultSize);
    if (cache.length < cacheSize) cache.push([keyword, result]);
  }
};
