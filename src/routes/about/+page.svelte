<script>
  import { Button, Switch } from "svelte-elegant";
  import { goto } from "$app/navigation";
  import { onMount } from "svelte";

  // Загружаем значение из localStorage или используем true по умолчанию
  let isNumbersAndLetters = true;

  function navigate() {
    goto("/home");
  }
</script>

<div class="content">
  <p>Are you ready to play?</p>
  <div class="mgn-top">
    <Button
      width="14.75rem"
      onClick={() => {
        localStorage.setItem(
          "isNumbersAndLetters",
          isNumbersAndLetters.toString()
        );
        navigate();
      }}>Ready to Go!</Button
    >
    <div class="switch-container">
      <p>Use numbers and letters</p>
      <div style:margin-left="0.5rem">
        <Switch bind:isChecked={isNumbersAndLetters} />
      </div>
    </div>
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

  .mgn-top {
    margin-top: 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .switch-container {
    display: flex;
    align-items: center;
    margin-top: 0.58rem;
  }
</style>
