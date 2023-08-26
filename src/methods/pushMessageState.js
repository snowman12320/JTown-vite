import emitter from '@/methods/emitter'

// import messageStore from '../stores/messageStore'
// import { mapActions } from 'pinia'

export default function (res, title = '更新') {
  if (res.data.success) {
    emitter.emit('push-message', {
      style: 'success',
      title: `success！${title}`
    })
    //* 這邊無法使用pinia ，所以改到vue中 儲存狀態
    // mapActions(messageStore, ['pushMessage'])
    // pushMessage('success', `success！${title}`)
  } else {
    // 有些訊息是字串，有些則是陣列，在此統一格式
    const message = typeof res.data.message === 'string' ? [res.data.message] : res.data.message
    emitter.emit('push-message', {
      style: 'danger',
      title: `${title}，failed`,
      content: message.join('、')
    })
  }
}
