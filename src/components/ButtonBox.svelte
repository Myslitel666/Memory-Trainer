<script lang="ts">
  import { themeStore } from "../stores/ThemeStore.js";
  import Button from "./Button.svelte";
  import "../styles/app.css";
  import "../styles/font.css";

  let theme: any;

  // Подписываемся на изменения темы
  themeStore.subscribe((value) => {
    theme = value; // Инициализация объекта темы
  });

  export let borderRadius = theme?.border.borderRadius.extra;
  export let fontSize = "3rem";
  export let height = "7rem";
  export let isPrimary = false;
  export let value = "";
  export let width = "7rem";
</script>

<!-- Основной Box -->
<Button {isPrimary} {borderRadius} {fontSize} {height} {width} {...$$props}>
  {value}
  <slot />
</Button>
