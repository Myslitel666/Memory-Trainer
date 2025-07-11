<script lang="ts">
  import { themeStore } from "../../stores/ThemeStore.js";
  import { onMount } from "svelte";
  import { initialBodyStyle } from "../../utils/initialBodyStyle.js";
  import "../../styles/app.css";
  import "../../styles/font.css";

  export const prerender = true;

  let theme: any;

  // Подписываемся на изменения темы
  themeStore.subscribe((value) => {
    theme = value;
  });

  onMount(() => {
    initialBodyStyle(); // Применяем тему при запуске приложения
  });
</script>

<div class="app">
  <main>
    <slot />
  </main>
</div>
