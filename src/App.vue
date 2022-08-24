<template>
	<div class="container">
		<h1>{{ $store.state.appTitle }}</h1>
		<FormTask />
		<TodoList />
	</div>
</template>

<script>
import TodoList from "./components/TodoList.vue";
import FormTask from "./components/FormTask.vue";
import { onMounted } from "@vue/runtime-core";
import { useStore } from "vuex";
export default {
	name: "App",
	components: {
		TodoList,
		FormTask,
	},
	setup() {
		const { dispatch } = useStore();
		onMounted(() => {
			dispatch("getLocalStorage");
		});
	},
};
</script>

<style lang="scss">
:root {
	--black: #222;
	--blue: #249;
}
@import url("https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;500;600;700&display=swap");
* {
	font-family: "Open Sans", sans-serif;
	padding: 0;
	margin: 0;
	box-sizing: border-box;
}
.container {
	display: flex;
	flex-direction: column;
	align-items: center;
	margin: 1.1rem;
	h1 {
		color: var(--black);
	}
}
</style>
