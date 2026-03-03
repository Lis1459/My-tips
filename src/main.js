import "./assets/main.css"
import "@fontsource/poppins/500.css"
import "@fontsource/poppins/600.css"
import "@fontsource/poppins/400.css"
import "@fontsource/inter/600.css"

import { createApp } from "vue"
import App from "./App.vue"
import router from "./router"
import store from "./store"

const app = createApp(App)

app.use(router)
app.use(store)

app.mount("#app")
