<script>
  import { Button, Switch, TextField } from "svelte-elegant";
  import { goto } from "$app/navigation";

  // Загружаем значение из localStorage или используем true по умолчанию
  let isNumbersAndLetters = false;
  let longTermMemory = true;
  let length = "3";

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
  {#if longTermMemory}
    <div class="switch-container">
      <p style:width="7rem">
        {isNumbersAndLetters ? "String" : "Number"} Length:
      </p>
      <div style:margin-left="0.5rem">
        <TextField
          label="Length"
          bind:value={length}
          width="7rem"
          oninput={(e) => {
            if (e) {
              // Оставляем только цифры
              e.currentTarget.value = e.currentTarget.value.replace(
                /[^0-9]/g,
                ""
              );
            }
            length = e.currentTarget.value; // Обновляем привязанное значение
          }}
        />
      </div>
    </div>
  {/if}

  <div class="mgn-top">
    <Button
      width="14.75rem"
      onClick={() => {
        localStorage.setItem(
          "isNumbersAndLetters",
          isNumbersAndLetters.toString()
        );
        let numericLength = parseInt(length);
        if (numericLength > 11) {
          localStorage.setItem("stringLength", "10");
        } else if (numericLength > 0 && numericLength < 11) {
          localStorage.setItem("stringLength", length);
        } else if (numericLength < 1) {
          localStorage.setItem("stringLength", "1");
        }
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
