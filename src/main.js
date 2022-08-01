import { createApp } from 'vue'
import App from './App.vue'
import './assets/tailwind.css'

// loading screen
import Loading from 'vue3-loading-screen'

createApp(App).use(Loading, {
    bg: '#87CEFA',
    slot: `
    <div class="px-5 py-3 bg-green-400 opacity-80 rounded-lg border-2 border-stone-600">
      <h3 class="text-3xl text-stone-600"><i class="fas fa-spinner fa-spin"></i> Loading...</h3>
    </div>
  `
}).mount('#app')
