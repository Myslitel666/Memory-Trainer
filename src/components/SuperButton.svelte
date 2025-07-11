<script>
  export let onClick = () => {};
  export let bgColor = "#37ad52";

  // Функция для подсветки кнопки и выполнения обработчика
  function handleClick() {
    // 1. Мгновенно делаем кнопку "нажатой"
    bgColor = "#2f8d45";

    // 2. Вызываем переданный обработчик
    onClick();

    // 3. Через 300ms возвращаем в исходное состояние
    setTimeout(() => {
      bgColor = "#37ad52";
    }, 150);
  }
</script>

<button on:click={handleClick} style:background-color={bgColor}>
  <slot />
</button>

<style>
  button {
    border: none;
    height: 8rem;
    width: 8rem;
    border-radius: 1rem;
    font-size: 4rem;
    cursor: pointer;
    transition: background-color 0.15s ease;
    margin-right: 0.66rem;
    margin-bottom: 0.66rem;
    font-family: "Roboto", sans-serif;
  }
</style>
