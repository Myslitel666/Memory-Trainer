<script>
  import { Button, Switch } from "svelte-elegant";
  import { goto } from "$app/navigation";

  // Загружаем значение из localStorage или используем true по умолчанию
  let isNumbersAndLetters = false;
  let longTermMemory = true;

  function navigate(link) {
    goto(link);
  }
</script>

<div class="content">
  <p style:font-size="1.2rem" style:font-weight="500">Select Mode</p>
  <div class="switch-container">
    <p class="width">Use numbers and letters</p>
    <div style:margin-left="0.5rem">
      <Switch bind:isChecked={isNumbersAndLetters} />
    </div>
  </div>
  <div class="switch-container">
    <p class="width">Long-term memory</p>
    <div style:margin-left="0.5rem">
      <Switch bind:isChecked={longTermMemory} />
    </div>
  </div>

  <div class="mgn-top">
    <Button
      width="14.75rem"
      onClick={() => {
        localStorage.setItem(
          "isNumbersAndLetters",
          isNumbersAndLetters.toString()
        );
        if (longTermMemory) {
          navigate("/long-term");
        } else {
          navigate("/home");
        }
      }}>Ready to Go!</Button
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
    width: 100vw;
  }

  .width {
    width: 10.5rem;
  }

  .mgn-top {
    margin-top: 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .switch-container {
    display: flex;
    align-items: center;
    margin-top: 0.77rem;
  }
</style>
