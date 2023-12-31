export function currency(num) {
  const n = parseInt(num, 10);
  return `${n
    .toFixed(0)
    .replace(/./g, (c, i, a) =>
      i && c !== '.' && (a.length - i) % 3 === 0 ? `, ${c}`.replace(/\s/g, '') : c
    )}`;
}
// 日期
export function date(time) {
  const localDate = new Date(time * 1000);
  return localDate.toLocaleDateString();
}
// 日期時間
export function dateAndTime(time) {
  return new Date(time * 1000).toLocaleString();
}
// 日期 轉 秒數 (傳入日期輸入欄)
// 只有日期 2023-11-11 轉 以秒为单位的时间戳 1699660800
export function dateToSeconds(date) {
  // 底層邏輯
  // const years = new Date(date).getFullYear();
  // const month = new Date(date).getMonth() + 1;
  // const day = new Date(date).getDate();
  // return years * 365 * 24 * 60 * 60 + month * 30 * 24 * 60 * 60 + day * 24 * 60 * 60;
  return Math.floor(new Date(date) / 1000);
}
//秒數 轉 日期或時間
export function dateOrTime(date) {
  return new Date(date * 1000).toISOString().split('T');
}
