<template>
  <div class="modal" ref="modal">
    <div class="modal-content">
      <h4>Новая задача...</h4>
      <div class="row">
        <div class="col s12">
          <div class="row">
            <div class="input-field col s12">
              <input id="title" type="text" v-model="ACTIVE_TODO.title" />
              <label for="title">Наименование</label>
            </div>
          </div>
          <div class="row">
            <div class="input-field col s12">
              <textarea id="description" class="materialize-textarea" v-model="ACTIVE_TODO.description" ref="description"></textarea>
              <label for="description">Описание</label>
            </div>
          </div>
          <p>
            <label>
              <input type="checkbox" v-model="ACTIVE_TODO.complete" />
              <span>Выполнено</span>
            </label>
          </p>
        </div>
      </div>
    </div>
    <div class="modal-footer">
      <a href="#!" class="modal-close waves-effect waves-green btn-flat" @click.prevent="$emit('modal-result', true)">Сохранить</a>
      <a href="#!" class="modal-close waves-effect waves-red btn-flat" @click.prevent="$emit('modal-result', false)">Отмена</a>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  beforeDestroy() {
    if (this.modal && this.modal.destroy) {
      this.modal.destroy()
    }
  },
  computed: {
    ...mapGetters(['ACTIVE_TODO']),
  },
  data: () => ({
    modal: null,
  }),
  methods: {
    open() {
      this.modal.open()
      setInterval(() => {
        M.updateTextFields()
        M.textareaAutoResize(this.$refs.description)
      }, 0)
    },
    close() {
      this.modal.close()
    },
  },
  mounted() {
    this.modal = M.Modal.init(this.$refs.modal, {
      dismissible: false,
    })
  },
}
</script>

<style></style>
