<script lang="ts">
  import { Button } from "svelte-elegant";
  import { onMount } from "svelte";
  import { themeStore, themeMode } from "svelte-elegant/stores/themeStore";
  import { ButtonBox } from "svelte-elegant";
  import { Backspace, Enter } from "svelte-elegant/icons-elegant";

  let cntChr = 3;
  let inputStr = "";
  let isError = 0;
  let record = 0;
  let rightColor = "";
  let errColor = "";
  let num = "";
  let textRender = "";

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
      let rnd = Math.floor(Math.random() * 9) + 1;
      num += rnd;
    }
  }

  function hideNum(num: String) {
    let hidden = "";

    for (let i = 0; i < num.length; i++) {
      hidden += "•";
    }

    return hidden;
  }

  function inputChr() {
    let txtRender = inputStr;

    for (let i = 0; i < num.length - inputStr.length; i++) {
      txtRender += "•";
    }

    return txtRender;
  }

  function toVsbl() {
    genNumb();
    textRender = num;
    setTimeout(() => {
      textRender = hideNum(num);
    }, 1750);
  }

  onMount(() => {
    toVsbl();
  });
</script>

<div class="content">
  <div style:min-height="2.5rem">
    <p
      style:color={isError ? errColor : rightColor}
      style:font-size={theme.typography.maxSize}
    >
      {textRender}
    </p>
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
                onclick={() => {
                  if (textRender !== num) {
                    if (inputStr.length < num.length) {
                      inputStr += button;
                      textRender = inputChr();
                    }
                  }
                }}
              >
                {button}
              </ButtonBox>
            {:else if button == "Bs"}
              <ButtonBox
                marginRight="0.75rem"
                isPrimary={true}
                onclick={() => {
                  inputStr = inputStr.slice(0, -1);
                  textRender = inputChr();
                }}
              >
                <Backspace />
              </ButtonBox>
            {:else if button == "En"}
              <ButtonBox
                isPrimary={true}
                onclick={() => {
                  if (inputStr !== "" || num === "") {
                    checkResult();
                  }
                }}
              >
                <Enter />
              </ButtonBox>
            {/if}
          {/each}
        </div>
      {/each}
    </div>
  </div>
  <div class="mgn-top">
    <span>Count: {cntChr}</span>
  </div>
  <div class="mgn-top">
    <span
      >Your Record: <span style:color={theme.palette.primary}>{record}</span
      ></span
    >
  </div>
</div>

<style>
  .content {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    height: 100vh;
  }

  .mgn-top {
    margin-top: 1rem;
  }
</style>
