<script>
  import Button from "../components/Button.svelte";
  import SuperButton from "../components/SuperButton.svelte";
  let num = "";
  let length = 3;
  let input = "";
  let display = "";
  let hidden = "•";
  let isHidden = false;
  let color = "#37ad52";
  let record = 3;

  // Функция для генерации строки с числами
  function generateNumberString() {
    let result = "";
    for (let i = 0; i < length; i++) {
      result += Math.floor(Math.random() * 10); // случайная цифра от 0 до 9
    }
    num = result; // Сохраняем результат в переменную num
  }

  // Функция для генерации строки с числами
  function showNum() {
    isHidden = false;
    display = num;
    hidden = "";

    for (let i = 0; i < length; i++) {
      hidden += "•";
    }

    // Через 3 секунды скрываем
    setTimeout(() => {
      display = hidden;
      isHidden = true;
    }, 1750);
  }

  // Функция ввода
  function btnClick(numClick) {
    if (isHidden && input.length < num.length) {
      input += numClick;
      displayInputWithHidden();
    }
  }

  //Функция Backspace
  function handleBackspace() {
    input = input.slice(0, -1); // Удаляем последний символ
    displayInputWithHidden();
  }

  //Функция отображения ввода с учётом hidden
  function displayInputWithHidden() {
    display = input;
    for (let i = 0; i < length - input.length; i++) {
      display += "•";
    }
  }

  //Функция проверки результата
  function checkResult() {
    if (input === num) {
      if (length > record) {
        record = length;
      }
      length = length + 1;
      color = "#37ad52";
    } else {
      length = length - 1;
      color = "#df1e1e";
    }

    input = "";
    generateNumberString();
    showNum();
  }

  generateNumberString();
  showNum();
</script>

<div class="app">
  <p style:color>{display}</p>
  <div class="row">
    <Button
      onClick={() => {
        btnClick(1);
      }}>1</Button
    >
    <Button
      onClick={() => {
        btnClick(2);
      }}>2</Button
    >
    <Button
      onClick={() => {
        btnClick(3);
      }}>3</Button
    >
  </div>
  <div class="row">
    <Button
      onClick={() => {
        btnClick(4);
      }}>4</Button
    >
    <Button
      onClick={() => {
        btnClick(5);
      }}>5</Button
    >
    <Button
      onClick={() => {
        btnClick(6);
      }}>6</Button
    >
  </div>
  <div class="row">
    <Button
      onClick={() => {
        btnClick(7);
      }}>7</Button
    >
    <Button
      onClick={() => {
        btnClick(8);
      }}>8</Button
    >
    <Button
      onClick={() => {
        btnClick(9);
      }}>9</Button
    >
  </div>
  <div class="row">
    <SuperButton onClick={handleBackspace}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        class="size-6"
      >
        <path
          fill-rule="evenodd"
          d="M2.515 10.674a1.875 1.875 0 0 0 0 2.652L8.89 19.7c.352.351.829.549 1.326.549H19.5a3 3 0 0 0 3-3V6.75a3 3 0 0 0-3-3h-9.284c-.497 0-.974.198-1.326.55l-6.375 6.374ZM12.53 9.22a.75.75 0 1 0-1.06 1.06L13.19 12l-1.72 1.72a.75.75 0 1 0 1.06 1.06l1.72-1.72 1.72 1.72a.75.75 0 1 0 1.06-1.06L15.31 12l1.72-1.72a.75.75 0 1 0-1.06-1.06l-1.72 1.72-1.72-1.72Z"
          clip-rule="evenodd"
        />
      </svg>
    </SuperButton>
    <Button
      onClick={() => {
        btnClick(0);
      }}>0</Button
    >
    <SuperButton onClick={checkResult}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        class="size-6"
      >
        <path
          fill-rule="evenodd"
          d="M16.5 3.75a1.5 1.5 0 0 1 1.5 1.5v13.5a1.5 1.5 0 0 1-1.5 1.5h-6a1.5 1.5 0 0 1-1.5-1.5V15a.75.75 0 0 0-1.5 0v3.75a3 3 0 0 0 3 3h6a3 3 0 0 0 3-3V5.25a3 3 0 0 0-3-3h-6a3 3 0 0 0-3 3V9A.75.75 0 1 0 9 9V5.25a1.5 1.5 0 0 1 1.5-1.5h6Zm-5.03 4.72a.75.75 0 0 0 0 1.06l1.72 1.72H2.25a.75.75 0 0 0 0 1.5h10.94l-1.72 1.72a.75.75 0 1 0 1.06 1.06l3-3a.75.75 0 0 0 0-1.06l-3-3a.75.75 0 0 0-1.06 0Z"
          clip-rule="evenodd"
        />
      </svg>
    </SuperButton>
  </div>
</div>
<div style:display="flex" style:width="100%" style:justify-content="center">
  <span> Your Record: </span>
  <span
    style:color="#37ad52"
    style:margin-left="0.2rem"
    style:justify-content="center"
  >
    {record}
  </span>
</div>
<div style:display="flex" style:width="100%" style:justify-content="center">
  <span> Current Length: </span>
  <span style:color style:margin-left="0.2rem" style:justify-content="center">
    {length}
  </span>
</div>

<style>
  .app {
    margin-top: 3rem;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .row {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  p {
    height: 3.88rem;
    font-size: 3rem;
    margin: 0;
    display: flex;
    justify-content: center;
    font-family: "Roboto", sans-serif;
  }

  span {
    font-size: 1.33rem;
    font-family: "Roboto", sans-serif;
    margin-bottom: 0.25rem;
    color: #555555;
  }
</style>
