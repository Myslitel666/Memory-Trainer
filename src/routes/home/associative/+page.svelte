<script lang="ts">
  import { themeStore, themeMode } from "svelte-elegant/stores";
  import { onMount } from "svelte";
  import { TextField, ButtonBox, Box } from "svelte-elegant";

  let textFieldElement: TextField | null = null; // Явно инициализируем как null
  let isInitialized = false;

  let whoIsShown: "message" | "pairs" | "input" = "message";
  const messageDelay = 1550;
  const pairDelay = 1750;
  let shownPair = {};
  let pairShownIndex = 0;
  let pairs = [];
  let message = "Remember";
  const maxCharCount = 2;
  let count = 2;
  let inputStr = "";
  let isError = 0;
  let record = 0;
  let rightColor = "";
  let errColor = "";
  let num = "";
  let nums = [""];
  let textRender = "";
  let isHidden = false;
  let letters = "QWERTYUIOPASDFGHJKLZXCVBNM";
  let checkIndex = 0;

  let buttons = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    ["Bs", 0, "En"],
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

  async function genPairs() {
    pairs = [];

    for (let i = 0; i < count; i++) {
      const letterInd = Math.floor(Math.random() * letters.length);
      let number = 0;

      if (count < 10) {
        number = Math.floor(Math.random() * 10);
      } else {
        number = Math.floor(Math.random() * 100);
      }
      pairs.push({ letter: letters[letterInd], number: number.toString() });
    }
  }

  function delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async function showPair() {
    whoIsShown = "pairs";

    for (let i = 0; i < pairs.length; i++) {
      shownPair = {
        letter: pairs[i].letter,
        number: pairs[i].number,
      };
      await delay(pairDelay);
    }
    await showMessage("Repeat");
    whoIsShown = "input";
  }

  async function showMessage(msg) {
    whoIsShown = "message";
    message = msg;
    await delay(messageDelay);
  }

  async function startMemoryTraining() {
    genPairs(); // Генерируем пары
    await showMessage("Remember");
    await showPair(); // Показываем пары спустя тайм-код
  }

  onMount(() => {
    startMemoryTraining();

    isInitialized = true;

    //toVsbl();
  });

  $: {
    if (inputStr.length > maxCharCount) onBackClick();

    if (isHidden) {
      textRender = inputStr;
      // Добавляем маскирующие символы
      const dotsToAdd = Math.max(0, maxCharCount - textRender.length);
      textRender += "•".repeat(dotsToAdd);
    }
  }

  function checkResult() {
    // Если допущена ошибка
    if (inputStr !== nums[checkIndex]) {
      if (count > 1) count--;
      isError = 1;
      checkIndex = 0;
      isHidden = false;
      inputStr = "";

      return;
    }

    //Если значение введено верно
    isError = 0;

    if (checkIndex != nums.length - 1) {
      checkIndex++;
      let hidden = hideNum(nums[checkIndex]);
      textRender = hidden;
      isHidden = true;
    } else {
      if (count > record) record = count;
      count++;
      checkIndex = 0;
      isHidden = false;
    }

    inputStr = "";
  }

  function hideNum(num: String) {
    let hidden = "";

    for (let i = 0; i < num.length; i++) {
      hidden += "•";
    }

    return hidden;
  }

  function onNumbClick(event: MouseEvent, button: string | number) {
    if (isHidden) {
      if (inputStr.length < maxCharCount) {
        inputStr += button;
      }
    }
  }

  function onBackClick() {
    inputStr = inputStr.slice(0, -1);
  }

  function onEnterClick() {
    checkResult();

    setTimeout(() => {
      textFieldElement?.focus();
    }, 1);
  }
</script>

{#if isInitialized}
  <div class="content">
    <div class="render" style:color={isError === 1 ? errColor : rightColor}>
      {#if whoIsShown === "pairs"}
        <Box
          color={isError === 1 ? errColor : rightColor}
          width="93px"
          height="93px"
        >
          <div class="text-box" style:color="#0e7ef0">{shownPair.letter}</div>
        </Box>
        <Box width="93px" height="93px">
          <div class="text-box" style:color={rightColor}>
            {shownPair.number}
          </div>
        </Box>
      {:else if whoIsShown === "message"}
        {message}
      {:else}
        <Box
          color={isError === 1 ? errColor : rightColor}
          width="93px"
          height="93px"
        >
          <div class="text-box" style:color="#0e7ef0">M</div>
        </Box>
        <Box width="93px" height="93px">
          <div class="text-box" style:color={rightColor}>?</div>
        </Box>
      {/if}
    </div>
    <div class="mgn-top">
      <div style:display="flex" style:flex-direction="column">
        {#each buttons as buttonLine}
          <div style:display="flex" style:flex-direction="row">
            {#each buttonLine as button}
              {#if button != "Bs" && button != "En"}
                <ButtonBox
                  marginRight={Number(button) % 3 === 0 && Number(button) !== 0
                    ? ""
                    : "0.75rem"}
                  marginBottom={button === "0" ? "" : "0.75rem"}
                  onClick={(event: MouseEvent) => {
                    onNumbClick(event, button);
                  }}
                >
                  {button}
                </ButtonBox>
              {:else if button == "Bs"}
                <ButtonBox
                  marginRight="0.75rem"
                  isPrimary={true}
                  onClick={onBackClick}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    class="size-6"
                    height="4rem"
                    width="4rem"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M2.515 10.674a1.875 1.875 0 0 0 0 2.652L8.89 19.7c.352.351.829.549 1.326.549H19.5a3 3 0 0 0 3-3V6.75a3 3 0 0 0-3-3h-9.284c-.497 0-.974.198-1.326.55l-6.375 6.374ZM12.53 9.22a.75.75 0 1 0-1.06 1.06L13.19 12l-1.72 1.72a.75.75 0 1 0 1.06 1.06l1.72-1.72 1.72 1.72a.75.75 0 1 0 1.06-1.06L15.31 12l1.72-1.72a.75.75 0 1 0-1.06-1.06l-1.72 1.72-1.72-1.72Z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </ButtonBox>
              {:else if button == "En"}
                <ButtonBox isPrimary={true} onClick={onEnterClick}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    class="size-6"
                    height="4rem"
                    width="4rem"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M16.5 3.75a1.5 1.5 0 0 1 1.5 1.5v13.5a1.5 1.5 0 0 1-1.5 1.5h-6a1.5 1.5 0 0 1-1.5-1.5V15a.75.75 0 0 0-1.5 0v3.75a3 3 0 0 0 3 3h6a3 3 0 0 0 3-3V5.25a3 3 0 0 0-3-3h-6a3 3 0 0 0-3 3V9A.75.75 0 1 0 9 9V5.25a1.5 1.5 0 0 1 1.5-1.5h6Zm-5.03 4.72a.75.75 0 0 0 0 1.06l1.72 1.72H2.25a.75.75 0 0 0 0 1.5h10.94l-1.72 1.72a.75.75 0 1 0 1.06 1.06l3-3a.75.75 0 0 0 0-1.06l-3-3a.75.75 0 0 0-1.06 0Z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </ButtonBox>
              {/if}
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
    font-size: 2.7rem;
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
