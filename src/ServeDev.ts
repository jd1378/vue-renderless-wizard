import { createApp } from 'vue';
import Dev from './ServeDev.vue';

const app = createApp(Dev).mount('#app');

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
app.config.devtools = true;
