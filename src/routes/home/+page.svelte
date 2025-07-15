<script lang="ts">
  import { themeStore, themeMode } from "svelte-elegant/stores";
  import { onMount } from "svelte";
  import ButtonBox from "svelte-elegant/ButtonBox";
  import { TextField, Button } from "svelte-elegant";

  let textFieldElement: TextField | null = null; // Явно инициализируем как null
  let isNumbersAndLetters = true; // значение по умолчанию
  let isInitialized = false;

  let cntChr = 3;
  let inputStr = "";
  let isError = 0;
  let record = 0;
  let rightColor = "";
  let errColor = "";
  let num = "";
  let textRender = "";
  let isHidden = false;
  let symbols = "QWERTYUIOPASDFGHJKLZXCVBNM";

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

  function checkResult() {
    if (inputStr === num) {
      if (cntChr > record) record = cntChr;
      cntChr++;
      isError = 0;
    } else {
      cntChr--;
      isError = 1;
    }
    toVsbl();
    inputStr = "";
  }

  function genNumb() {
    num = "";

    for (let i = 0; i < cntChr; i++) {
      if (isNumbersAndLetters) {
        let NumOrLetter = Math.floor(Math.random() * 2) + 1; //Цифра или буква
        if (NumOrLetter === 1) {
          //Если буква
          const indSymbols = Math.floor(Math.random() * symbols.length);
          num += symbols[indSymbols];
        } else {
          //Если цифра
          let rnd = Math.floor(Math.random() * 9);
          num += rnd;
        }
      } else {
        let rnd = Math.floor(Math.random() * 9);
        num += rnd;
      }
    }
  }

  function hideNum(num: String) {
    let hidden = "";

    for (let i = 0; i < num.length; i++) {
      hidden += "•";
    }

    return hidden;
  }

  function toVsbl() {
    genNumb();
    textRender = num;
    setTimeout(() => {
      textRender = hideNum(num);
      isHidden = true;
      // Добавляем фиктивную задержку для гарантии обновления DOM
      setTimeout(() => {
        textFieldElement?.focus();
      }, 1);
    }, 1750);
  }

  onMount(() => {
    const storedValue = localStorage.getItem("isNumbersAndLetters");

    if (storedValue) {
      isNumbersAndLetters = JSON.parse(storedValue) === true ? true : false;
    } else {
      isNumbersAndLetters = true;
    }

    isInitialized = true;

    toVsbl();
  });

  $: {
    if (inputStr.length > num.length) onBackClick();

    inputStr = inputStr.toLocaleUpperCase();

    if (isHidden) {
      textRender = inputStr;
      // Добавляем маскирующие символы
      const dotsToAdd = Math.max(0, num.length - textRender.length);
      textRender += "•".repeat(dotsToAdd);
    }
  }
  function onNumbClick(event: MouseEvent, button: string | number) {
    if (textRender !== num) {
      if (inputStr.length < num.length) {
        inputStr += button;
      }
    }
    //(event.target as HTMLElement).blur();
  }

  function onBackClick() {
    inputStr = inputStr.slice(0, -1);
  }

  function onEnterClick() {
    checkResult();
    isHidden = false;
  }
</script>

{#if isInitialized}
  <div class="content" style:height="43rem">
    <div style:min-height="3rem" style:margin-top="4rem">
      <p style:color={isError ? errColor : rightColor} class="render">
        {textRender}
      </p>
    </div>
    <div class="mgn-top">
      <div style:display="flex" style:flex-direction="column">
        {#if isNumbersAndLetters}
          <div
            style:margin-bottom="1rem"
            style:padding-left="0.83rem"
            style:padding-right="0.97rem"
            style:width="100vw"
            style:max-width="27.5rem"
            style:box-sizing="border-box"
          >
            <TextField
              bind:this={textFieldElement}
              bind:value={inputStr}
              label="Enter the String"
              disabled={!isHidden}
              width="100%"
            />
            <Button
              marginTop="0.66rem"
              width="100%"
              isPrimary={true}
              onClick={onEnterClick}
            >
              Next Level
            </Button>
          </div>
        {:else}
          {#each buttons as buttonLine}
            <div style:display="flex" style:flex-direction="row">
              {#each buttonLine as button}
                {#if button != "Bs" && button != "En"}
                  <ButtonBox
                    marginRight={Number(button) % 3 === 0 &&
                    Number(button) !== 0
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
        {/if}
      </div>
    </div>
    <div class="mgn-top">
      <span
        >Count: <span style:color={theme.palette.primary}>{cntChr}</span></span
      >
    </div>
    <div class="mgn-top">
      <span
        >Your Record: <span style:color={theme.palette.primary}>{record}</span
        ></span
      >
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
    height: 100vh;
  }

  .mgn-top {
    margin-top: 0.25rem;
    font-size: 1.4rem;
  }

  .render {
    font-size: 2.7rem;
  }

  @media (max-width: 392px) {
    .render {
      font-size: 2rem;
    }
  }
</style>
