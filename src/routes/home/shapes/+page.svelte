<script lang="ts">
  import { themeStore, themeMode } from "svelte-elegant/stores";
  import { onMount } from "svelte";
  import { ButtonBox, Box } from "svelte-elegant";

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
  let shownShape = "";
  let message = "Remember";
  const maxCharCount = 2;
  let count = 3;
  let shapes: string[] = [];

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
    let usedShapes: string[] = [];
    let shapeInd = 0;

    for (let i = 0; i < count; i++) {
      let isShapeNotUnique = true;

      while (isShapeNotUnique) {
        shapeInd = Math.floor(Math.random() * shapesVariants.length);
        const lastTwo = usedShapes.slice(-2);
        if (!lastTwo.includes(shapesVariants[shapeInd]))
          isShapeNotUnique = false; //Хотя бы последние 2 фигуры должны быть уникальны
      }

      usedShapes.push(shapesVariants[shapeInd]);
    }

    shapes = usedShapes;
  }

  function delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async function showShape() {
    whoIsShown = "pairs";

    for (let i = 0; i < shapes.length; i++) {
      shownShape = shapes[i];
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

      if (inputShape === shapes[checkShapeIndex]) {
        if (checkShapeIndex < shapes.length) {
          if (checkShapeIndex === shapes.length - 1) {
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
        {#if shownShape === "Circle"}
          <Circle size={ShapeSize} />
        {:else if shownShape === "Square"}
          <Square size={ShapeSize} />
        {:else if shownShape === "Diamonds"}
          <Diamonds size={ShapeSize} />
        {:else if shownShape === "Pentagon"}
          <Pentagon size={ShapeSize} />
        {:else if shownShape === "Triangle"}
          <Triangle size={ShapeSize} />
        {:else if shownShape === "Hexagon"}
          <Hexagon size={ShapeSize} />
        {:else if shownShape === "Heart"}
          <Heart size={ShapeSize} />
        {:else if shownShape === "Dodecahedron"}
          <Dodecahedron size={ShapeSize} />
        {:else if shownShape === "Cube"}
          <Cube size={ShapeSize} />
        {:else if shownShape === "Cylinder"}
          <Cylinder size={ShapeSize} />
        {:else if shownShape === "Cone"}
          <Cone size={ShapeSize} />
        {:else}
          <Hexahedron size={ShapeSize} />
        {/if}
      {:else if whoIsShown === "message"}
        {message}
      {:else if inputShape}
        {#if inputShape === "Circle"}
          <Circle size={ShapeSize} />
        {:else if inputShape === "Square"}
          <Square size={ShapeSize} />
        {:else if inputShape === "Diamonds"}
          <Diamonds size={ShapeSize} />
        {:else if inputShape === "Pentagon"}
          <Pentagon size={ShapeSize} />
        {:else if inputShape === "Triangle"}
          <Triangle size={ShapeSize} />
        {:else if inputShape === "Hexagon"}
          <Hexagon size={ShapeSize} />
        {:else if inputShape === "Heart"}
          <Heart size={ShapeSize} />
        {:else if inputShape === "Dodecahedron"}
          <Dodecahedron size={ShapeSize} />
        {:else if inputShape === "Cube"}
          <Cube size={ShapeSize} />
        {:else if inputShape === "Cylinder"}
          <Cylinder size={ShapeSize} />
        {:else if inputShape === "Cone"}
          <Cone size={ShapeSize} />
        {:else}
          <Hexahedron size={ShapeSize} />
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
            <Circle size="45px" />
          </ButtonBox>
          <ButtonBox
            filter={$themeMode === "light" ? "" : "brightness(0.7)"}
            marginBottom="11px"
            onClick={(event: MouseEvent) => {
              onShapeClick("Triangle");
            }}
          >
            <Triangle size="49px" />
          </ButtonBox>
          <ButtonBox
            filter={$themeMode === "light" ? "" : "brightness(0.7)"}
            marginBottom="11px"
            onClick={(event: MouseEvent) => {
              onShapeClick("Square");
            }}
          >
            <Square size="42px" />
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
            <Diamonds />
          </ButtonBox>
          <ButtonBox
            filter={$themeMode === "light" ? "" : "brightness(0.7)"}
            marginBottom="11px"
            onClick={(event: MouseEvent) => {
              onShapeClick("Pentagon");
            }}
          >
            <Pentagon />
          </ButtonBox>
          <ButtonBox
            filter={$themeMode === "light" ? "" : "brightness(0.7)"}
            marginBottom="11px"
            onClick={(event: MouseEvent) => {
              onShapeClick("Hexagon");
            }}
          >
            <Hexagon />
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
            <Heart />
          </ButtonBox>
          <ButtonBox
            filter={$themeMode === "light" ? "" : "brightness(0.7)"}
            marginBottom="11px"
            onClick={(event: MouseEvent) => {
              onShapeClick("Dodecahedron");
            }}
          >
            <Dodecahedron />
          </ButtonBox>
          <ButtonBox
            filter={$themeMode === "light" ? "" : "brightness(0.7)"}
            marginBottom="11px"
            onClick={(event: MouseEvent) => {
              onShapeClick("Cube");
            }}
          >
            <Cube />
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
            <Cylinder />
          </ButtonBox>
          <ButtonBox
            filter={$themeMode === "light" ? "" : "brightness(0.7)"}
            marginBottom="11px"
            onClick={(event: MouseEvent) => {
              onShapeClick("Cone");
            }}
          >
            <Cone />
          </ButtonBox>
          <ButtonBox
            filter={$themeMode === "light" ? "" : "brightness(0.7)"}
            marginBottom="11px"
            onClick={(event: MouseEvent) => {
              onShapeClick("Hexahedron");
            }}
          >
            <Hexahedron />
          </ButtonBox>
        </div>
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
