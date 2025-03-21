<script lang="ts">
  import { Button } from "svelte-elegant";
  import { onMount } from "svelte";
  import { themeStore, themeMode } from "svelte-elegant/stores/themeStore";
  import { ButtonBox } from "svelte-elegant";
  import { Backspace, Enter } from "svelte-elegant/icons-elegant";

  let shSqnc = "visible";
  let shTxtAr = "visible";
  let cntChr = 3;
  let sqnc = "";
  let inputStr = "";
  let isError = 0;
  let record = 0;

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
  });

  function genNumb() {
    sqnc = "";

    for (let i = 0; i < cntChr; i++) {
      let rnd = Math.floor(Math.random() * 9) + 1;
      sqnc += rnd;
    }
  }

  function toVsbl() {
    genNumb();
    shSqnc = "visible";
    setTimeout(() => {
      shSqnc = "hidden";
    }, 1750);
  }

  function checkResult() {
    if (inputStr === sqnc) {
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

  onMount(() => {
    toVsbl();
  });
</script>

<div class="content">
  <div class="mgn-top">
    <p
      style:visibility={shSqnc}
      style:color={isError ? "red" : "green"}
      style:margin-top="0.75rem"
    >
      {sqnc}
    </p>
    <div style:display="flex" style:flex-direction="column">
      {#each buttons as buttonLine}
        <div style:display="flex" style:flex-direction="row">
          {#each buttonLine as button}
            {#if button != "Bs" && button != "En"}
              <ButtonBox
                marginRight="0.75rem"
                marginBottom="0.75rem"
                onclick={() => {
                  console.log(button);
                }}
              >
                {button}
              </ButtonBox>
            {:else if button == "Bs"}
              <ButtonBox
                marginRight="0.75rem"
                marginBottom="0.75rem"
                isPrimary={true}
              >
                <Backspace />
              </ButtonBox>
            {:else if button == "En"}
              <ButtonBox
                marginRight="0.75rem"
                marginBottom="0.75rem"
                isPrimary={true}
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
    <span style:visibility={shTxtAr}>Count: {cntChr}</span>
  </div>
  <div class="mgn-top">
    <span style:visibility={shTxtAr}
      >Your Record: <span style:color="green">{record}</span></span
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
