<template>
	<div class="tasks-container">
		<!-- <select name="show">
			<option value="">Todo</option>
			<option value="completed">Completado</option>
			<option value="inprogress">En progreso</option>
		</select> -->
		<TodoItem v-for="task in tasks" :task="task" :key="task.id" />
	</div>
</template>

<script>
import { computed, onUpdated } from "@vue/runtime-core";
import { useStore } from "vuex";
import TodoItem from "./TodoItem.vue";
export default {
	name: "TodoList",
	components: { TodoItem },
	setup() {
		const store = useStore();
		const tasks = computed(() => store.state.tasks);
		onUpdated(() => {
			store.dispatch("updateLocalStorage");
		});
		return {
			tasks,
		};
	},
};
</script>

<style lang="scss" scoped>
.tasks-container {
	width: 60%;
	display: flex;
	flex-direction: column;
	gap: 0.8rem;
	// select {
	// 	outline: none;
	// 	width: 20%;
	// 	align-self: end;
	// 	border-radius: 5px;
	// }
}
</style>
