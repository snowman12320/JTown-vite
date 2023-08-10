export function currency (num) {
  const n = parseInt(num, 10);
  return `${n.toFixed(0).replace(/./g, (c, i, a) => (i && c !== '.' && ((a.length - i) % 3 === 0) ? `, ${c}`.replace(/\s/g, '') : c))}`;
}
// 日期 / 日期時間
export function date (time) {
  const localDate = new Date(time * 1000);
  return localDate.toLocaleDateString();
}
export function dateAndTime (time) { //! 要記得全域註冊
  return new Date(time * 1000).toLocaleString();
}
//* 使用優惠券，折價後價格
export function coupon (price, coupon) {
  return price / (coupon / 100);
}
