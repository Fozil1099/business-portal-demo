// Яндекс Карты JS API 2.1 подключаются один раз по требованию.
// Ключ необязателен: карта и метки работают и без него, ключ нужен для геокодера и квот.

export type YMaps = any;

declare global {
  interface Window {
    ymaps?: YMaps;
  }
}

let loading: Promise<YMaps> | null = null;

const whenReady = (ymaps: YMaps) =>
  new Promise<YMaps>((resolve) => ymaps.ready(() => resolve(ymaps)));

export const loadYandexMaps = (lang = "ru_RU"): Promise<YMaps> => {
  if (window.ymaps) return whenReady(window.ymaps);
  if (loading) return loading;

  loading = new Promise<YMaps>((resolve, reject) => {
    const apiKey = import.meta.env.VITE_YANDEX_MAPS_API_KEY;
    const script = document.createElement("script");
    script.src = `https://api-maps.yandex.ru/2.1/?lang=${lang}${apiKey ? `&apikey=${apiKey}` : ""}`;
    script.async = true;
    script.onload = () => whenReady(window.ymaps).then(resolve);
    script.onerror = () => {
      loading = null;
      script.remove();
      reject(new Error("Yandex Maps failed to load"));
    };
    document.head.appendChild(script);
  });

  return loading;
};
