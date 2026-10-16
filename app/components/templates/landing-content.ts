import type { CSSProperties } from "react";
import { readableAccentText } from "./presentation";

export interface LandingFeature {
  title: string;
  description: string;
}
export interface LandingContent {
  name: string;
  title: string;
  copy: string;
  cta: string;
  pageId: string;
  demo: string;
  accent: string;
  features: LandingFeature[];
  style: CSSProperties;
}

export function landingContent(
  data: Record<string, any>,
  fallback: string,
): LandingContent {
  const ai = data?.aiConfig || data?.AiConfig || {};
  const name = data?.productName || data?.ProductName || "Ürün";
  const suppliedAccent =
    data?.accentColor || ai.accentColor || ai.AccentColor || fallback;
  const accent = /^#[0-9a-f]{3}([0-9a-f]{3})?$/i.test(suppliedAccent)
    ? suppliedAccent
    : fallback;
  const rawFeatures = data?.features || ai.features || ai.Features || [];
  const features = Array.isArray(rawFeatures)
    ? rawFeatures
        .filter(
          (item): item is Record<string, string> =>
            item &&
            typeof item === "object" &&
            typeof (item.title || item.Title) === "string",
        )
        .map((item) => ({
          title: item.title || item.Title,
          description: item.description || item.Description || "",
        }))
    : [];
  const rawDemo = data?.demoLink || data?.DemoLink || "";
  const demo = /^https?:\/\//i.test(rawDemo) ? rawDemo : "";
  return {
    name,
    title:
      data?.aiGeneratedHeroTitle ||
      ai.aiGeneratedHeroTitle ||
      ai.AiGeneratedHeroTitle ||
      `${name} ile tanışın.`,
    copy:
      data?.aiGeneratedMarketingCopy ||
      ai.aiGeneratedMarketingCopy ||
      ai.AiGeneratedMarketingCopy ||
      "Ürünü inceleyin, gelişmelerden haberdar olmak için bekleme listesine katılın.",
    cta:
      data?.callToActionText ||
      ai.callToActionText ||
      ai.CallToActionText ||
      "Listeye katıl",
    pageId: data?.id || data?.Id || "",
    demo,
    accent,
    features,
    style: {
      "--lp-accent": accent,
      "--lp-on-accent": readableAccentText(accent),
    } as CSSProperties,
  };
}
