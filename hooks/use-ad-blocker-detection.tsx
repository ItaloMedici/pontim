"use client";

import { useEffect, useState } from "react";

export const useAdBlockerDetection = () => {
  const [isAdBlockerActive, setIsAdBlockerActive] = useState<boolean | null>(
    null,
  );
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const detectAdBlocker = async () => {
      try {
        // Método 1: Tentar criar um elemento que seria bloqueado por ad blockers
        const testElement = document.createElement("div");
        testElement.innerHTML = "&nbsp;";
        testElement.className = "adsbox";
        testElement.style.cssText =
          "position: absolute; left: -10000px; top: -1000px;";
        document.body.appendChild(testElement);

        // Aguardar um pouco para o ad blocker atuar
        await new Promise((resolve) => setTimeout(resolve, 100));

        const isBlocked =
          testElement.offsetHeight === 0 ||
          testElement.offsetLeft === 0 ||
          testElement.offsetTop === 0 ||
          testElement.offsetWidth === 0 ||
          getComputedStyle(testElement).display === "none" ||
          getComputedStyle(testElement).visibility === "hidden";

        document.body.removeChild(testElement);

        // Método 2: Tentar carregar um script de ads comum
        const canLoadAds = await new Promise((resolve) => {
          const script = document.createElement("script");
          script.src =
            "//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js";
          script.async = true;
          script.onload = () => resolve(true);
          script.onerror = () => resolve(false);

          // Timeout para evitar espera infinita
          setTimeout(() => resolve(false), 3000);

          document.head.appendChild(script);

          // Limpar o script após o teste
          setTimeout(() => {
            if (script.parentNode) {
              script.parentNode.removeChild(script);
            }
          }, 100);
        });

        if (isMounted) {
          setIsAdBlockerActive(isBlocked || !canLoadAds);
          setIsLoading(false);
        }
      } catch (error) {
        console.warn("Erro ao detectar ad blocker:", error);
        if (isMounted) {
          // Em caso de erro, assumir que não há bloqueador
          setIsAdBlockerActive(false);
          setIsLoading(false);
        }
      }
    };

    // Aguardar um pouco para garantir que a página carregou
    const timer = setTimeout(detectAdBlocker, 1000);

    return () => {
      isMounted = false;
      clearTimeout(timer);
    };
  }, []);

  return { isAdBlockerActive, isLoading };
};
