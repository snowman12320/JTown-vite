import { defineStore } from 'pinia'

export default defineStore('message', {
  state: () => ({
    message: {
      style: null,
      title: null,
      content: null
    },
    messages: []
  }),
  actions: {
    pushMessage(res, title = '更新') {
      if (res.data.success) {
        this.message = {
          style: 'success',
          title: `success！${title}`
        }
        this.messages.push(this.message)
      } else {
        // 這是res中的message，api預設的一些錯誤訊息
        const message = typeof res.data.message === 'string' ? [res.data.message] : res.data.message
        this.message = {
          style: 'danger',
          title: `${title}，failed`,
          content: message.join('、')
        }
        this.messages.push(this.message)
      }
    }
  }
})
