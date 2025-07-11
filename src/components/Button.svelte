<script>
  export let onClick = () => {};
  export let bgColor = "#efefef";

  // Функция для подсветки кнопки и выполнения обработчика
  function handleClick() {
    // 1. Мгновенно делаем кнопку "нажатой"
    bgColor = "#ddd";

    // 2. Вызываем переданный обработчик
    onClick();

    // 3. Через 300ms возвращаем в исходное состояние
    setTimeout(() => {
      bgColor = "#efefef";
    }, 150);
  }
</script>

<button
  on:click={handleClick}
  style:background-color={bgColor}
  style:display="flex"
  style:justify-content="center"
  style:align-items="center"
  style:padding="1.25rem"
>
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
    color: #333;
    -webkit-tap-highlight-color: transparent;
  }

  /* Планшеты */
  @media (max-width: 512px) {
    button {
      height: 6rem;
      width: 6rem;
      font-size: 3.25rem;
    }
  }
</style>
