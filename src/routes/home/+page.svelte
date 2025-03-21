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

  let buttons = [
    [1,2,3],
    [4,5,6],
    [7,8,9],
    ['Bs',0,'En']
];

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
    <span style:visibility={shTxtAr}>Count: {cntChr}</span>
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
  <div style:display = flex style:flex-direction = column>
    {#each buttons as buttonLine}
      <div style:display = flex style:flex-direction = row>
        {#each buttonLine as button}
          {#if button != 'Bs' && button != 'En'}
            <button class = btn>
              {button}
            </button>
          {:else if button == 'Bs'}
            <button class = btn>
                Back
            </button>
          {:else if button == 'En'}
            <button class = btn>
                Enter
            </button>
          {/if}
        {/each}
      </div>
    {/each}
  </div>
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

  .btn {
    width: 6rem;
    height: 6rem;
    background-color: #f8f8f8;
    margin-right: 0.75rem;
    margin-bottom: 0.75rem;
    border-radius: 0.75rem;
    font-size: 32px;
    color: #4a4a4a;
  }
</style>
