<script lang="ts">
  import { themeStore } from "../stores/ThemeStore.js";
  import { onMount } from "svelte";
  import Button from "./Button.svelte";
  import "../styles/app.css";
  import "../styles/font.css";

  let theme: any;
  let isMobile = false;

  // Определяем мобильное устройство при монтировании
  onMount(() => {
    isMobile = window.matchMedia("(max-width: 768px)").matches;

    // Обработчик изменения размера экрана
    const mediaQuery = window.matchMedia("(max-width: 768px)");
    const handleResize = (e: MediaQueryListEvent) => {
      isMobile = e.matches;
    };
    mediaQuery.addEventListener("change", handleResize);

    return () => mediaQuery.removeEventListener("change", handleResize);
  });

  // Подписываемся на изменения темы
  themeStore.subscribe((value) => {
    theme = value;
  });

  // Динамические размеры в зависимости от устройства
  export let borderRadius = theme?.border.borderRadius.extra;
  export let fontSize = isMobile ? "2rem" : "3rem";
  export let height = isMobile ? "5rem" : "7rem";
  export let isPrimary = false;
  export let value = "";
  export let width = isMobile ? "5rem" : "7rem";
</script>

<!-- Основной Box -->
<Button {isPrimary} {borderRadius} {fontSize} {height} {width} {...$$props}>
  {value}
  <slot />
</Button>
