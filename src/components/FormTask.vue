<template>
	<div class="form-group">
		<input
			type="text"
			class="task-input"
			placeholder="Ingrese la tarea"
			v-model="task"
		/>
		<input
			type="submit"
			class="add-button"
			value="Crear Tarea"
			@click="handleClick"
		/>
	</div>
</template>

<script>
import { ref } from "@vue/reactivity";
import { useStore } from "vuex";
export default {
	name: "FormTask",
	setup() {
		const task = ref("");
		const store = useStore();
		const handleClick = () => {
			if (task.value.length <= 3) {
				alert("Debe agregar una tarea y debe tener mas de 3 caracteres");
				return;
			}
			store.dispatch("createTask", task.value);
			task.value = "";
		};
		return {
			task,
			handleClick,
		};
	},
};
</script>

<style lang="scss" scoped>
.form-group {
	display: flex;
	align-items: center;
	margin: 1.3rem 0;
	width: 60%;
	.task-input,
	.add-button {
		min-height: 50px;
		font-size: 1.3rem;
	}
	.task-input {
		border: none;
		border: 1px solid var(--blue);
		width: 70%;
		padding: 0 1rem;
		outline: none;
		border-radius: 7px 0px 0px 7px;
		&:focus {
			--blue: #24f;
		}
	}
	.add-button {
		border: none;
		width: 30%;
		border-radius: 0 7px 7px 0;
		padding: 0.5em 1em;
		background-color: var(--blue);
		cursor: pointer;
		color: #fff;
		transition: background-color 0.3s ease;
		&:hover {
			--blue: #14b;
		}
		&:active {
			--blue: #138;
		}
	}
}
</style>
