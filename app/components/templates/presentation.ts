/** Keep custom brand colours readable on buttons, including pale accent presets. */
export function readableAccentText(hex: string): string {
  const value = hex.replace("#", "");
  const full = value.length === 3 ? value.split("").map(x => x + x).join("") : value;
  if (!/^[0-9a-f]{6}$/i.test(full)) return "#ffffff";
  const channels = [0, 2, 4].map(start => {
    const channel = parseInt(full.slice(start, start + 2), 16) / 255;
    return channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4;
  });
  const luminance = channels[0] * 0.2126 + channels[1] * 0.7152 + channels[2] * 0.0722;
  return luminance > 0.179 ? "#111111" : "#ffffff";
}
