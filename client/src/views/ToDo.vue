<template>
  <div class="container">
    <h2>Список дел</h2>
    <select v-model="filter" ref="selectFilter">
      <option value="all">Показывать всё</option>
      <option value="notCompleted">Показывать не выполненные</option>
      <option value="completed">Показывать выполненные</option>
    </select>
    <p v-if="!TODO_LIST.length" class="grey-text">У вас нет дел...</p>
    <section v-else>
      <div v-for="(item, inx) in filterList" :key="inx">
        <div class="row">
          <div class="col s12">
            <p>
              <label>
                <input type="checkbox" v-model="item.complete" :disabled="item.complete" @change="updateTodo(item)" />
                <span :class="{ 'black-text': !item.complete, u: item.complete }"
                  >{{ inx + 1 }}. {{ item.title }} <small class="grey-text">({{ new Date(item.date) }})</small></span
                >
              </label>
            </p>
            <blockquote :class="{ u: item.complete, 'grey-text': item.complete }">{{ item.description }}</blockquote>
            <div class="center">
              <a href="#!" class="btn btn-flat white waves-effect" @click.prevent="editData(item)"><i class="material-icons left">edit</i>Редактировать</a>
              <a href="#!" class="btn btn-flat white waves-effect" @click.prevent="deleteData(item)"><i class="material-icons left">delete</i>Удалить</a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <modal ref="modal" @modal-result="modalResult" />

    <div class="fixed-action-btn">
      <a class="btn-floating btn-large waves-effect waves-light red" @click="newData">
        <i class="large material-icons">add</i>
      </a>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'

import Modal from '../components/Modal.vue'

export default {
  beforeDestroy() {
    if (this.selectFilter && this.selectFilter.destroy) {
      this.selectFilter.destroy()
    }
  },
  components: { Modal },
  computed: {
    ...mapGetters(['ACTIVE_TODO', 'TODO_LIST']),
    filterList() {
      if (!this.TODO_LIST.length || this.filter === 'all') {
        return this.TODO_LIST
      }
      if (this.filter === 'notCompleted') {
        return this.TODO_LIST.filter((todo) => todo.complete === false)
      }
      if (this.filter === 'completed') {
        return this.TODO_LIST.filter((todo) => todo.complete === true)
      }
    },
  },
  data: () => ({
    filter: 'notCompleted',
    selectFilter: null,
  }),
  methods: {
    ...mapMutations(['CLR_ACTIVE_TODO', 'ADD_TODO_LIST']),
    ...mapActions(['getTodoList', 'postTodo', 'getTodoById', 'deleteTodoById', 'updateTodoById']),
    deleteData(todo) {
      this.deleteTodoById(todo._id)
    },
    editData(todo) {
      this.getTodoById(todo._id)
      this.$refs.modal.open()
    },
    newData() {
      this.CLR_ACTIVE_TODO()
      this.$refs.modal.open()
    },
    updateTodo(todo) {
      if (todo._id) {
        this.updateTodoById({
          id: todo._id,
          todo,
        })
      }
    },
    modalResult(result) {
      if (result) {
        if (this.ACTIVE_TODO._id) {
          this.updateTodo(this.ACTIVE_TODO)
        } else {
          this.postTodo(this.ACTIVE_TODO)
        }
      }
    },
  },
  mounted() {
    this.selectFilter = M.FormSelect.init(this.$refs.selectFilter, {})
    this.getTodoList()
  },
}
</script>

<style scoped>
.u {
  text-decoration: line-through;
}
</style>
