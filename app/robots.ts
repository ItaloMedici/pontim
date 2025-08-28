import { MetadataRoute } from "next";
import { env } from "../env";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = env.SITE_URL;

  return {
    rules: [
      {
        userAgent: "*",
        allow: [
          "/",
          "/pricing",
          "/login",
          "/scrum-poker",
          "/faq",
          "/story-points",
          "/fibonacci",
          "/marketing/*",
          "/_next/static/*",
          "/sounds/*",
          "/manifest.json",
          "/llm.txt",
        ],
        disallow: [
          // Área de usuário autenticado
          "/home/",
          "/room/",
          "/invite/",
          "/report/",
          "/close-window/",
          "/logout/",
          // APIs privadas
          "/api/",
          "/api/*",
          // Arquivos do sistema
          "/_next/",
          "/admin/",
          // Rotas temporárias ou sensíveis
          "/temp/",
          "/*.json$",
          // Parâmetros dinâmicos que não devem ser indexados
          "/*?*utm_*",
          "/*?*session*",
          "/*?*token*",
        ],
      },
      // Regras específicas para Googlebot
      {
        userAgent: "Googlebot",
        allow: ["/", "/pricing", "/marketing/*", "/sounds/*", "/llm.txt"],
        disallow: ["/api/", "/home/", "/room/", "/invite/"],
      },
      // Regras específicas para Bingbot
      {
        userAgent: "Bingbot",
        allow: ["/", "/pricing", "/marketing/*", "/llm.txt"],
        disallow: ["/api/", "/home/", "/room/", "/invite/"],
      },
      // Bloquear bots maliciosos conhecidos
      {
        userAgent: [
          "CCBot", // ChatGPT scraper
          "GPTBot", // OpenAI scraper
          "Google-Extended", // Bard scraper
          "ChatGPT-User",
          "ia_archiver",
          "FacebookBot",
        ],
        disallow: "/",
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
