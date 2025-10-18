<script lang="ts">
  import { themeStore, themeMode } from "svelte-elegant/stores";
  import { onMount } from "svelte";
  import { ButtonBox, Box, Button } from "svelte-elegant";

  import {
    Circle,
    Square,
    Diamonds,
    Pentagon,
    Triangle,
    Hexagon,
    Heart,
    Dodecahedron,
    Cube,
    Cylinder,
    Cone,
    Hexahedron,
  } from "svelte-elegant/icons-elegant";

  let isInitialized = false;
  let whoIsShown: "message" | "pairs" | "input" = "message";
  const messageDelay = 1550;
  const pairDelay = 1750;
  let shownShape = { shape: "", color: "" };
  let message = "Remember";
  let count = 3;
  let coloredShapes: { shape: string; color: string }[] = [];

  const shapesVariants = [
    "Circle",
    "Square",
    "Diamonds",
    "Pentagon",
    "Triangle",
    "Hexagon",
    "Heart",
    "Dodecahedron",
    "Cube",
    "Cylinder",
    "Cone",
    "Hexahedron",
  ];

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

  const ShapeSize = "66px";
  let checkShapeIndex = 0;
  let inputShape = "";
  let isError = 0;
  let rightColor = "";
  let errColor = "";
  let record = 0;

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

  async function genShapes() {
    let usedShapes: { shape: string; color: string }[] = [];
    let shapeInd = 0;
    let colorInd = 0;

    for (let i = 0; i < count; i++) {
      let isShapeNotUnique = true;

      while (isShapeNotUnique) {
        shapeInd = Math.floor(Math.random() * shapesVariants.length);
        colorInd = Math.floor(Math.random() * colorVariants.length);
        const lastTwoColors = usedShapes.slice(-2).map((item) => item.color);
        const lastTwoShapes = usedShapes.slice(-2).map((item) => item.shape);
        if (
          !lastTwoColors.includes(colorVariants[colorInd]) &&
          !lastTwoShapes.includes(shapesVariants[shapeInd])
        )
          isShapeNotUnique = false; //Хотя бы последние 2 фигуры должны быть уникальны
      }

      usedShapes.push({
        shape: shapesVariants[shapeInd],
        color: colorVariants[colorInd],
      });
    }

    coloredShapes = usedShapes;
  }

  function delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async function showShape() {
    whoIsShown = "pairs";

    for (let i = 0; i < coloredShapes.length; i++) {
      shownShape = {
        shape: coloredShapes[i].shape,
        color: coloredShapes[i].color,
      };
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
    inputShape = "";
    genShapes(); // Генерируем пары
    if (isError === 0) {
      if (checkShapeIndex === 0) {
        await showMessage("Remember");
      } else {
        await showMessage("GOOD!");
      }
    } else await showMessage("MISTAKE!"); // Отображаем сообщение "Remember" или "MISTAKE!"
    await showShape(); // Показываем пары (последовательно спустя тайм-код)
    isError = 0;
    await showMessage("Repeat"); // Отображаем сообщение "Repeat"
    checkShapeIndex = 0; // Сбрасываем индекс пары, с которой будем осуществлять сравнение
    await showInput(); // Приглашаем ко вводу
  }

  onMount(() => {
    startMemoryTraining();

    isInitialized = true;
  });

  function onShapeClick(shClick: string) {
    if (whoIsShown === "input") {
      inputShape = shClick;

      if (inputShape === coloredShapes[checkShapeIndex].shape) {
        if (checkShapeIndex < coloredShapes.length) {
          if (checkShapeIndex === coloredShapes.length - 1) {
            if (count > record) record = count;
            count++;
            startMemoryTraining();
          } else {
            checkShapeIndex = checkShapeIndex + 1;
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
        {#if shownShape.shape === "Circle"}
          <Circle size="56px" fill={shownShape.color} />
        {:else if shownShape.shape === "Square"}
          <Square size="56px" fill={shownShape.color} />
        {:else if shownShape.shape === "Diamonds"}
          <Diamonds size={ShapeSize} fill={shownShape.color} />
        {:else if shownShape.shape === "Pentagon"}
          <Pentagon size={ShapeSize} fill={shownShape.color} />
        {:else if shownShape.shape === "Triangle"}
          <Triangle size={ShapeSize} fill={shownShape.color} />
        {:else if shownShape.shape === "Hexagon"}
          <Hexagon size={ShapeSize} fill={shownShape.color} />
        {:else if shownShape.shape === "Heart"}
          <Heart size={ShapeSize} fill={shownShape.color} />
        {:else if shownShape.shape === "Dodecahedron"}
          <Dodecahedron size={ShapeSize} />
        {:else if shownShape.shape === "Cube"}
          <Cube size={ShapeSize} fill={shownShape.color} />
        {:else if shownShape.shape === "Cylinder"}
          <Cylinder size={ShapeSize} fill={shownShape.color} />
        {:else if shownShape.shape === "Cone"}
          <Cone size={ShapeSize} fill={shownShape.color} />
        {:else}
          <Hexahedron size={ShapeSize} />
        {/if}
      {:else if whoIsShown === "message"}
        {message}
      {:else if inputShape}
        {#if inputShape === "Circle"}
          <Circle fill={$themeStore.icon.color.primary} size={ShapeSize} />
        {:else if inputShape === "Square"}
          <Square fill={$themeStore.icon.color.primary} size={ShapeSize} />
        {:else if inputShape === "Diamonds"}
          <Diamonds fill={$themeStore.icon.color.primary} size={ShapeSize} />
        {:else if inputShape === "Pentagon"}
          <Pentagon fill={$themeStore.icon.color.primary} size={ShapeSize} />
        {:else if inputShape === "Triangle"}
          <Triangle fill={$themeStore.icon.color.primary} size={ShapeSize} />
        {:else if inputShape === "Hexagon"}
          <Hexagon fill={$themeStore.icon.color.primary} size={ShapeSize} />
        {:else if inputShape === "Heart"}
          <Heart fill={$themeStore.icon.color.primary} size={ShapeSize} />
        {:else if inputShape === "Dodecahedron"}
          <Dodecahedron
            fill={$themeStore.icon.color.primary}
            size={ShapeSize}
          />
        {:else if inputShape === "Cube"}
          <Cube fill={$themeStore.icon.color.primary} size={ShapeSize} />
        {:else if inputShape === "Cylinder"}
          <Cylinder fill={$themeStore.icon.color.primary} size={ShapeSize} />
        {:else if inputShape === "Cone"}
          <Cone fill={$themeStore.icon.color.primary} size={ShapeSize} />
        {:else}
          <Hexahedron fill={$themeStore.icon.color.primary} size={ShapeSize} />
        {/if}
      {:else}
        <div class="text-box" style:color={rightColor}>?</div>
      {/if}
    </div>
    <div class="mgn-top">
      <div style:display="flex" style:flex-direction="column">
        <div style:display="flex" style:flex-direction="row" style:gap="11px">
          <ButtonBox
            filter={$themeMode === "light" ? "" : "brightness(0.7)"}
            marginBottom="11px"
            onClick={(event: MouseEvent) => {
              onShapeClick("Circle");
            }}
          >
            <Circle fill={$themeStore.icon.color.primary} size="45px" />
          </ButtonBox>
          <ButtonBox
            filter={$themeMode === "light" ? "" : "brightness(0.7)"}
            marginBottom="11px"
            onClick={(event: MouseEvent) => {
              onShapeClick("Triangle");
            }}
          >
            <Triangle fill={$themeStore.icon.color.primary} size="49px" />
          </ButtonBox>
          <ButtonBox
            filter={$themeMode === "light" ? "" : "brightness(0.7)"}
            marginBottom="11px"
            onClick={(event: MouseEvent) => {
              onShapeClick("Square");
            }}
          >
            <Square fill={$themeStore.icon.color.primary} size="42px" />
          </ButtonBox>
        </div>
        <div style:display="flex" style:flex-direction="row" style:gap="11px">
          <ButtonBox
            filter={$themeMode === "light" ? "" : "brightness(0.7)"}
            marginBottom="11px"
            onClick={(event: MouseEvent) => {
              onShapeClick("Diamonds");
            }}
          >
            <Diamonds fill={$themeStore.icon.color.primary} />
          </ButtonBox>
          <ButtonBox
            filter={$themeMode === "light" ? "" : "brightness(0.7)"}
            marginBottom="11px"
            onClick={(event: MouseEvent) => {
              onShapeClick("Pentagon");
            }}
          >
            <Pentagon fill={$themeStore.icon.color.primary} />
          </ButtonBox>
          <ButtonBox
            filter={$themeMode === "light" ? "" : "brightness(0.7)"}
            marginBottom="11px"
            onClick={(event: MouseEvent) => {
              onShapeClick("Hexagon");
            }}
          >
            <Hexagon fill={$themeStore.icon.color.primary} />
          </ButtonBox>
        </div>
        <div style:display="flex" style:flex-direction="row" style:gap="11px">
          <ButtonBox
            filter={$themeMode === "light" ? "" : "brightness(0.7)"}
            marginBottom="11px"
            onClick={(event: MouseEvent) => {
              onShapeClick("Heart");
            }}
          >
            <Heart fill={$themeStore.icon.color.primary} />
          </ButtonBox>
          <ButtonBox
            filter={$themeMode === "light" ? "" : "brightness(0.7)"}
            marginBottom="11px"
            onClick={(event: MouseEvent) => {
              onShapeClick("Dodecahedron");
            }}
          >
            <Dodecahedron fill={$themeStore.icon.color.primary} />
          </ButtonBox>
          <ButtonBox
            filter={$themeMode === "light" ? "" : "brightness(0.7)"}
            marginBottom="11px"
            onClick={(event: MouseEvent) => {
              onShapeClick("Cube");
            }}
          >
            <Cube fill={$themeStore.icon.color.primary} />
          </ButtonBox>
        </div>
        <div style:display="flex" style:flex-direction="row" style:gap="11px">
          <ButtonBox
            filter={$themeMode === "light" ? "" : "brightness(0.7)"}
            marginBottom="11px"
            onClick={(event: MouseEvent) => {
              onShapeClick("Cylinder");
            }}
          >
            <Cylinder fill={$themeStore.icon.color.primary} />
          </ButtonBox>
          <ButtonBox
            filter={$themeMode === "light" ? "" : "brightness(0.7)"}
            marginBottom="11px"
            onClick={(event: MouseEvent) => {
              onShapeClick("Cone");
            }}
          >
            <Cone fill={$themeStore.icon.color.primary} />
          </ButtonBox>
          <ButtonBox
            filter={$themeMode === "light" ? "" : "brightness(0.7)"}
            marginBottom="11px"
            onClick={(event: MouseEvent) => {
              onShapeClick("Hexahedron");
            }}
          >
            <Hexahedron fill={$themeStore.icon.color.primary} />
          </ButtonBox>
        </div>
      </div>
    </div>
    <div class="score">
      <div style:display="flex" style:gap="7px">
        <Button height="40px" width="150px" isPrimary={false}>Back</Button>
        <Button height="40px" width="150px">Next</Button>
      </div>
      <div style:margin-top="4px">
        <div class="mgn-top">
          <span class="mgn-top">
            Count: <span style:color={theme.palette.primary}>{count}</span>
          </span>
        </div>
        <div class="mgn-top">
          <span class="mgn-top">
            Your Record: <span style:color={theme.palette.primary}
              >{record}</span
            >
          </span>
        </div>
      </div>
    </div>
  </div>
{:else}
  <div></div>
{/if}

<style>
  .score {
    text-align: center;
  }

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
    font-size: 50px;
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
