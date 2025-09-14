<script>
  import ColorThemeSwitch from "svelte-elegant/ColorThemeSwitch";
  import { goto } from "$app/navigation";
  import Header from "svelte-elegant/Header";
  import { DiagramIconPro } from "svelte-elegant/icons-elegant";

  import { themeMode, themeStore } from "svelte-elegant/stores";

  let theme;

  let logotypeFilter = "";
  let svelteColor = "";
  let elegantColor = "";

  // Подписываемся на изменения темы
  themeStore.subscribe((value) => {
    theme = value; //Инициализация объекта темы

    svelteColor = theme.palette.primary;
    elegantColor = $themeMode === "light" ? "#383838" : "#fdfdfd";
    logotypeFilter = $themeMode === "light" ? "brightness(80%)" : "";
  });
</script>

<Header>
  <button style:gap="0.5rem" onclick={() => goto("/settings")}>
    <p style:font-size="26px">
      <span
        style:color={svelteColor}
        style:filter={logotypeFilter}
        style:transition="all 0.3s"
      >
        Memory
      </span>
      <span style:color={elegantColor} style:transition="all 0.3s">
        Trainer
      </span>
    </p>
  </button>
  <div class="buttons">
    <span style:margin-top="7px">
      <DiagramIconPro size="56px" />
    </span>
    <ColorThemeSwitch />
  </div>
</Header>

<style>
  .buttons {
    display: flex;
    margin-left: auto;
    gap: 5px;
    justify-content: center;
    align-items: center;
    margin-right: 5px;
  }
</style>
