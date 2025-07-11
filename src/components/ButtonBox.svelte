<script lang="ts">
  import { themeStore } from "../stores/ThemeStore.js";
  import { onMount, afterUpdate } from "svelte";
  import Button from "./Button.svelte";
  import "../styles/app.css";
  import "../styles/font.css";

  let theme: any;
  let isMobile = false;

  // Реактивные переменные
  $: currentFontSize = isMobile ? "2rem" : "3rem";
  $: currentHeight = isMobile ? "5rem" : "7rem";
  $: currentWidth = isMobile ? "5rem" : "7rem";

  // Определение мобильного устройства
  onMount(() => {
    const checkMobile = () => {
      isMobile = window.innerWidth <= 391; // Стандартный breakpoint для мобильных
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  });

  // Подписка на тему
  themeStore.subscribe((value) => {
    theme = value;
  });

  export let borderRadius = theme?.border.borderRadius.extra;
  export let isPrimary = false;
  export let value = "";
</script>

<!-- Кнопка с реактивными размерами -->
<Button
  {isPrimary}
  {borderRadius}
  fontSize={currentFontSize}
  height={currentHeight}
  width={currentWidth}
  {...$$props}
>
  {value}
  <slot />
</Button>
