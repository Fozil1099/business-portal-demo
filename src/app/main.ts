import { createApp } from "vue";
import App from "./App.vue";

// styles
import "./styles/main.css";
import "@/shared/assets/styles/index.scss";
import "vue3-toastify/dist/index.css";

import registerProviders from "./providers";

const app = createApp(App);
registerProviders(app);
app.mount("#app");
