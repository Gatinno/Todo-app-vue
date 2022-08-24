<template>
	<div class="task">
		<div class="checkbox-container">
			<label class="checkbox">
				<input
					type="checkbox"
					name="complete"
					id="complete"
					@change="changeStatus"
				/>
				<i></i>
			</label>
		</div>
		<template v-if="!edit">
			<p class="task__title" :class="{completed: task.status}">{{ task.task }}</p>
		</template>
		<template v-else>
			<p class="task__title"
				><input type="text" v-model="newTask" :placeholder="task.task"
			/></p>
		</template>
		<div class="task__button-group">
			<button @click="editTask"
				><font-awesome-icon icon="fa-solid fa-pen-to-square"
			/></button>
			<button @click="deleteTask"
				><font-awesome-icon icon="fa-solid fa-trash-can"
			/></button>
		</div>
	</div>
</template>

<script>
import { ref } from "@vue/reactivity";
import { useStore } from "vuex";
export default {
	name: "TodoItem",
	props: {
		task: Object,
	},
	setup(props) {
		const edit = ref(false);
		const newTask = ref("");
		const { dispatch } = useStore();
		const deleteTask = () => {
			dispatch("deleteTask", props.task.id);
		};
		const editTask = () => {
			if (edit.value) {
				if (newTask.value.length <= 3) {
					alert(
						"El formulario no puede estar vacio y debe poseer mas de 3 caracteres"
					);
					return;
				}
				dispatch("updateTask", { id: props.task.id, newTask: newTask.value });
			}
			edit.value = !edit.value;
		};
		const changeStatus = (e) => {
			dispatch("changeTaskStatus", {
				id: props.task.id,
				checked: e.target.checked,
			});
		};
		return {
			deleteTask,
			editTask,
			changeStatus,
			edit,
			newTask,
		};
	},
};
</script>

<style lang="scss" scoped>
.task {
	display: flex;
	align-items: center;
	width: 100%;
	gap: 0.5rem;
	.checkbox-container {
		flex: 1;
		.checkbox {
			position: relative;
			margin-bottom: 30px;
			bottom: -7px;
			padding: 5px 0 5px 60px;
			display: block;
			input,
			select {
				appearance: none;
				-webkit-appearance: none;
				-moz-appearance: none;
			}
			input {
				visibility: hidden;
				position: absolute;
				right: 0;
			}
			input + i {
				background: #f0f0f0;
				border: 2px solid rgba(0, 0, 0, 0.2);
				position: absolute;
				left: 0;
				top: 0;
			}
			input[type="checkbox"] + i {
				width: 52px;
				height: 30px;
				border-radius: 15px;
			}
			input[type="checkbox"] + i:before {
				content: "";
				width: 26px;
				height: 26px;
				background: #fff;
				border-radius: 50%;
				position: absolute;
				z-index: 1;
				left: 0px;
				top: 0px;
				-webkit-box-shadow: 3px 0 3px 0 rgba(0, 0, 0, 0.2);
				box-shadow: 3px 0 3px 0 rgba(0, 0, 0, 0.2);
			}
			input[type="checkbox"]:checked + i:before {
				left: 22px;
				-webkit-box-shadow: -3px 0 3px 0 rgba(0, 0, 0, 0.2);
				box-shadow: 3px 0 -3px 0 rgba(0, 0, 0, 0.2);
			}
			input[type="checkbox"]:checked + i {
				background: var(--blue);
			}
		}
	}
	.task__title,
	.task__button-group button {
		font-size: 1.5rem;
		color: var(--black);
	}
	.task__title {
		flex: 12;
		&.completed {
				text-decoration: line-through;
			}
		input {
			font-size: inherit;
			color: var(--black);
			outline: none;
			border: none;
			border-bottom: 2px solid var(--black);
			--black: #666;
			width: 100%;
			padding: 0 1rem;
			&:focus {
				--black: #333;
			}
		}
		
	}
	.task__button-group {
		flex: 4;
		display: flex;
		justify-content: space-evenly;
		button {
			border: none;
			background: none;
			--black: #666;
			cursor: pointer;
			transition: color 0.2s ease;
			&:hover {
				--black: #444;
			}
		}
	}
}
</style>
