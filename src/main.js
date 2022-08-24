import { createApp } from "vue";
import App from "./App.vue";
import store from "./store";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faTrashCan, faPenToSquare } from "@fortawesome/free-solid-svg-icons";

library.add([faTrashCan, faPenToSquare]);

createApp(App)
	.use(store)
	.component("font-awesome-icon", FontAwesomeIcon)
	.mount("#app");
