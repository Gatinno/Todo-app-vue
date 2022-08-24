import { createStore } from "vuex";
import { v4 as uuidv4 } from "uuid";

export default createStore({
	state: {
		appTitle: "ToDo APP - Vue",
		tasks: [],
		// showTasks: "",
	},
	getters: {},
	mutations: {
		addNewTask: (state, payload) => {
			state.tasks.push(payload);
		},
		setTasks: (state, payload) => {
			state.tasks = [...payload];
		},
	},
	actions: {
		createTask({ commit }, payload) {
			let newTask = {
				id: uuidv4(),
				task: payload,
				status: false,
			};
			commit("addNewTask", newTask);
		},
		deleteTask({ state, commit }, payload) {
			const newState = state.tasks.filter((task) => task.id !== payload);
			console.log(newState);
			commit("setTasks", newState);
		},
		updateTask({ state, commit }, payload) {
			const newState = state.tasks.map((task) => {
				if (task.id === payload.id) {
					return { ...task, task: payload.newTask };
				}
				return task;
			});
			commit("setTasks", newState);
		},
		changeTaskStatus({ state, commit }, payload) {
			const newState = state.tasks.map((task) => {
				if (task.id === payload.id) {
					return { ...task, status: payload.checked };
				}
				return task;
			});
			commit("setTasks", newState);
		},
		getLocalStorage({ commit }) {
			const data = JSON.parse(localStorage.getItem("tasksList"));
			if (data === null) {
				localStorage.setItem("tasksList", JSON.stringify([]));
				return;
			}
			commit("setTasks", data);
		},
		updateLocalStorage({ state }) {
			localStorage.setItem("tasksList", JSON.stringify(state.tasks));
		},
	},
	modules: {},
});
