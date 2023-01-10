import { createApp } from "vue";
import App from "./App.vue";
import { login } from "./api/user";
login({ username: "admin", password: "123456" }).then(res => {
	console.log(res);
});

createApp(App).mount("#app");
