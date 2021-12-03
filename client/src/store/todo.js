import config from '@/config/settings'

export default {
  state: {
    todoList: [],
    activeTodo: {}
  },
  getters: {
    TODO_LIST: (s) => s.todoList,
    ACTIVE_TODO: (s) => s.activeTodo
  },
  mutations: {
    CLR_ACTIVE_TODO: (s) => s.activeTodo = {
      title: '',
      description: '',
      complete: false,
      date: Date.now()
    },
    SET_ACTIVE_TODO: (s, todo) => s.activeTodo = todo,
    ADD_TODO_LIST: (s, todo) => {
      s.todoList.push(todo)
    },
    DEL_TODO_LIST: (s, todo) => {
      const index = s.todoList.findIndex(task => task._id === todo._id)
      s.todoList.splice(index, 1)
    },
    UPD_TODO_LIST: (s, todo) => {
      const index = s.todoList.findIndex(task => task._id === todo._id)
      s.todoList.splice(index, 1, todo)
    },
    SET_TODO_LIST: (s, list) => s.todoList = list,
    CLR_TODO_LIST: (s) => s.todoList = []
  },
  actions: {
    //getTodoList
    async getTodoList({commit}) {
      try {
        const list = await fetch(`http://${config.serverIP}/api/todo/`, {
          method: 'get',
          headers: { 'Content-Type': 'application/json; charset=utf-8;' }
        })
        .then(result => result.json())
        commit('SET_TODO_LIST', list)
      } catch (error) {
        console.log(error)
      }
    },
    //getTodoById
    async getTodoById({commit}, id) {
      try {
        const response = await fetch(`http://${config.serverIP}/api/todo/${id}`, {
          method: 'get',
          headers: { 'Content-Type': 'application/json' }
        })
        .then(result => result.json())
        commit('SET_ACTIVE_TODO', response)
      } catch (error) {
        console.log(error)
      }
    },
    //postTodo
    async postTodo({commit}, todo) {
      try {
        const response = await fetch(`http://${config.serverIP}/api/todo/`, {
          method: 'post',
          mode: 'cors',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(todo)
        })
        .then(result => result.json())
        commit('ADD_TODO_LIST', response)
      } catch (error) {
        console.log(error)
      }
    },
    //updateTodo
    async updateTodoById({commit}, {id, todo}) {
      try {
        const response = await fetch(`http://${config.serverIP}/api/todo/${id}`, {
          method: 'put',
          mode: 'cors',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(todo)
        })
        .then(result => result.json())
        commit('UPD_TODO_LIST', response)
      } catch (error) {
        console.log(error)
      }
    },
    //deleteTodoById
    async deleteTodoById({commit}, id) {
      try {
        const response = await fetch(`http://${config.serverIP}/api/todo/${id}`, {
          method: 'delete',
          headers: { 'Content-Type': 'application/json' }
        })
        .then(result => result.json())
        commit('DEL_TODO_LIST', response)
      } catch (error) {
        console.log(error)
      }
    },
  },
  modules: {
  }
}