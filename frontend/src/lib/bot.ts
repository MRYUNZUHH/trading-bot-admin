import { api } from './api'

export const botApi = {
  getStats: () => api.get('/bot/stats'),
  getUsers: (page = 1, plan?: string) => api.get('/bot/users', { params: { page, plan } }),
  getSubscribers: () => api.get('/bot/subscribers'),
  sendMessage: (userId: string, message: string) => api.post('/bot/send-message', null, { params: { user_id: userId, message } }),
  broadcast: (plan: string, message: string) => api.post('/bot/broadcast', null, { params: { plan, message } })
}
