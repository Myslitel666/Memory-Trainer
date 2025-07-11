<script>
  export let onClick = () => {};
  export let bgColor = "#e7e7e7";

  // Функция для подсветки кнопки и выполнения обработчика
  function handleClick() {
    // 1. Мгновенно делаем кнопку "нажатой"
    bgColor = "#ddd";

    // 2. Вызываем переданный обработчик
    onClick();

    // 3. Через 300ms возвращаем в исходное состояние
    setTimeout(() => {
      bgColor = "#e7e7e7";
    }, 150);
  }
</script>

<button on:click={handleClick} style:background-color={bgColor}>
  <slot />
</button>

<style>
  button {
    color: #303030;
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
  }
</style>
