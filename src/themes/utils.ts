/**
 * 为颜色添加透明度
 * @param color - 十六进制颜色值
 * @param opacity - 透明度 (0-1)
 * @returns 带透明度的颜色值
 */
export const alpha = (color: string, opacity: number): string => {
  const hex = color.replace("#", "");
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};
