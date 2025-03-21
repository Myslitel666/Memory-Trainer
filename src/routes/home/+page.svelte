<script>
  import { Button } from "svelte-elegant";
  import { onMount } from "svelte";

  let shSqnc = "visible";
  let shTxtAr = "visible";
  let cntChr = 3;
  let sqnc = "";
  let inputStr = "";
  let isError = 0;
  let record = 0;

  let buttons = [1,2,3];
  let btnLines = [1,2,3,4];

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
    <span style:visibility={shTxtAr}>Numb Count1: {cntChr}</span>
    <span style:visibility={shTxtAr} style:margin-left="1.5rem"
      >Your Record: <span style:color="green">{record}</span></span
    >
  </div>
  <div class="mgn-top">
    <p style:visibility={shTxtAr}>
      {shSqnc === "visible" ? "Remember the number:" : "Enter the number"}
    </p>
    <p
      style:visibility={shSqnc}
      style:color={isError ? "red" : "green"}
      style:margin-top="0.75rem"
    >
      {sqnc}
    </p>
  </div>
  <div class="mgn-top">
    <textarea
      bind:value={inputStr}
      on:keydown={(event) => {
        if (event.key === "Enter") {
          event.preventDefault();
          checkResult();
        }
      }}
      style:visibility={shTxtAr}
      style:border="1px solid #d7d7d7"
      style:outline="none"
      style:border-radius="0.25rem"
      style:width="15rem"
      style:height="9rem"
      style:padding="0.66rem"
      style:margin-top="4rem"
      style:font-size="16px"
    >
    </textarea>
  </div>
  <div class="mgn-top" style:visibility={shTxtAr}>
    <Button
      width="11rem"
      onclick={() => {
        checkResult();
      }}>Check Result</Button
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
