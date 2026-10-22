/// <reference types="vite/client" />

// Allow importing CSS / SCSS files in TS/Vue without type errors
declare module "*.css";
declare module "*.scss";

// Explicit declarations for Swiper CSS side‑effect imports
declare module "swiper/css";
declare module "swiper/css/navigation";
declare module "swiper/css/pagination";
declare module "swiper/css/effect-fade";
