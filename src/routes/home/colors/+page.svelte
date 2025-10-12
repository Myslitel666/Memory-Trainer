<script lang="ts">
  import { themeStore, themeMode } from "svelte-elegant/stores";
  import { onMount } from "svelte";
  import { ButtonBox, Box } from "svelte-elegant";

  let isInitialized = false;
  let whoIsShown: "message" | "pairs" | "input" = "message";
  const messageDelay = 1550;
  const pairDelay = 1750;
  let shownColorInd = 0;
  let message = "Remember";
  const maxCharCount = 2;
  let count = 3;
  let colors: number[] = [];

  $: colorVariants =
    $themeMode === "light"
      ? [
          "#f84242",
          "#f753ef",
          "#8645f5",
          "#7cdeff",
          "#4c8dff",
          "#3030b7",
          "#00ffad",
          "#4ce332",
          "#96c615",
          "#f18d14",
          "#f7c32c",
          "#f7ee2d",
        ]
      : [
          "#f62626",
          "#ff33ec",
          "#9100ff",
          "#7cdeff",
          "#03a6ff",
          "#0033f0",
          "#00ffad",
          "#4ce332",
          "#96c615",
          "#f18d14",
          "#f7c32c",
          "#f7ee2d",
        ];

  let checkColorIndex = 0;
  let inputColor = "";
  let isError = 0;
  let rightColor = "";
  let errColor = "";
  let record = 0;

  let buttonLines = [
    [[], [], []],
    [[], [], []],
    [[], [], []],
    [[], [], []],
  ];

  let theme: any;

  // Подписываемся на изменения темы
  themeStore.subscribe((value) => {
    theme = value; //Инициализация объекта темы

    if ($themeMode === "light") {
      rightColor = theme.palette.primary;
      errColor = "red";
    } else {
      rightColor = "#24F048";
      errColor = theme.palette.primary;
    }
  });

  async function genColors() {
    let usedColors: number[] = [];
    let colorInd = 0;

    for (let i = 0; i < count; i++) {
      let isColorNotUnique = true;

      while (isColorNotUnique) {
        colorInd = Math.floor(Math.random() * colorVariants.length);
        const lastTwo = usedColors.slice(-2);
        if (!lastTwo.includes(colorInd)) isColorNotUnique = false; //Хотя бы последние 2 цвета должны быть уникальны
      }

      usedColors.push(colorInd);
    }

    colors = usedColors;
  }

  function delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async function showColor() {
    whoIsShown = "pairs";

    for (let i = 0; i < colors.length; i++) {
      shownColorInd = colors[i];
      await delay(pairDelay);
    }
  }

  async function showMessage(msg: string) {
    message = msg;
    whoIsShown = "message";
    await delay(messageDelay);
  }

  async function showInput() {
    whoIsShown = "input";
  }

  async function startMemoryTraining() {
    inputColor = "";
    genColors(); // Генерируем пары
    if (isError === 0) {
      if (checkColorIndex === 0) {
        await showMessage("Remember");
      } else {
        await showMessage("GOOD!");
      }
    } else await showMessage("MISTAKE!"); // Отображаем сообщение "Remember" или "MISTAKE!"
    await showColor(); // Показываем пары (последовательно спустя тайм-код)
    isError = 0;
    await showMessage("Repeat"); // Отображаем сообщение "Repeat"
    checkColorIndex = 0; // Сбрасываем индекс пары, с которой будем осуществлять сравнение
    await showInput(); // Приглашаем к вводу
  }

  onMount(() => {
    startMemoryTraining();

    isInitialized = true;

    //toVsbl();
  });

  function onNumbClick(event: MouseEvent, row: number, col: number) {
    if (whoIsShown === "input") {
      let selectedIndex = 3 * row + col;
      inputColor = colorVariants[selectedIndex];

      if (selectedIndex === colors[checkColorIndex]) {
        if (checkColorIndex < colors.length) {
          if (checkColorIndex === colors.length - 1) {
            if (count > record) record = count;
            count++;
            startMemoryTraining();
          } else {
            checkColorIndex = checkColorIndex + 1;
          }
        }
      } else {
        isError = 1;
        if (count > 1) count--;
        startMemoryTraining();
      }
    }
  }
</script>

{#if isInitialized}
  <div class="content">
    <div class="render" style:color={isError === 1 ? errColor : rightColor}>
      {#if whoIsShown === "pairs"}
        <div
          class="color-box"
          style:background-color={colorVariants[shownColorInd]}
        ></div>
      {:else if whoIsShown === "message"}
        {message}
      {:else if inputColor}
        <div class="color-box" style:background-color={inputColor}></div>
      {:else}
        <Box width="93px" height="93px">
          <div class="text-box" style:color={rightColor}>?</div>
        </Box>
      {/if}
    </div>
    <div class="mgn-top">
      <div style:display="flex" style:flex-direction="column">
        {#each buttonLines as buttonLine, i}
          <div style:display="flex" style:flex-direction="row" style:gap="11px">
            {#each buttonLine as button, j}
              <ButtonBox
                filter={$themeMode === "light" ? "" : "brightness(0.7)"}
                bgColor={colorVariants[3 * i + j]}
                marginBottom="11px"
                isPrimary
                onClick={(event: MouseEvent) => {
                  onNumbClick(event, i, j);
                }}
              ></ButtonBox>
            {/each}
          </div>
        {/each}
      </div>
    </div>
    <div class="mgn-top">
      <span>
        Count: <span style:color={theme.palette.primary}>{count}</span>
      </span>
    </div>
    <div class="mgn-top">
      <span>
        Your Record: <span style:color={theme.palette.primary}>{record}</span>
      </span>
    </div>
  </div>
{:else}
  <div></div>
{/if}

<style>
  .color-box {
    width: 93px;
    height: 93px;
    border-radius: 12.5px;
  }

  .content {
    display: flex;
    align-items: center;
    flex-direction: column;
  }

  .text-box {
    cursor: default;
    user-select: none;
  }

  .mgn-top {
    font-size: 1.4rem;
  }

  .render {
    font-size: 42px;
    display: flex;
    gap: 12px;
    margin-bottom: 12px;
    margin-top: 12px;
    height: 93px;
    align-items: center;
  }

  @media (max-width: 392px) {
    .render {
      font-size: 2rem;
    }
  }
</style>
