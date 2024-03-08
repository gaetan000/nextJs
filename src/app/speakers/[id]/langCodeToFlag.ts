
export const langCodeToFlag = (langCode: string): string => {
  switch (langCode) {
    case "en":
      return "🇬🇧";
    case "es":
      return "🇪🇸";
    case "fr":
      return "🇫🇷";
    case "de":
      return "🇩🇪";
    case "it":
      return "🇮🇹";
    case "pt":
      return "🇵🇹";
    case "pl":
      return "🇵🇱";
    case "tr":
      return "🇹🇷";
    case "ru":
      return "🇷🇺";
    case "nl":
      return "🇳🇱";
    case "cs":
      return "🇨🇿";
    case "ar":
      return "🇸🇦";
    case "zh_cn":
      return "🇨🇳";
    case "ja":
      return "🇯🇵";
    case "hu":
      return "🇭🇺";
    case "ko":
      return "🇰🇷";
    default:
      return "?";
  }
};
