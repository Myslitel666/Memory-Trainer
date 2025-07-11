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
    <SuperButton onClick={handleBackspace}>←</SuperButton>
    <Button
      onClick={() => {
        btnClick(0);
      }}>0</Button
    >
    <SuperButton onClick={checkResult}>↵</SuperButton>
  </div>
</div>
<div style:display="flex" style:width="100%" style:justify-content="center">
  <span> Current Length: </span>
  <span style:color style:margin-left="0.2rem" style:justify-content="center">
    {length}
  </span>
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

<style>
  .app {
    display: flex;
    flex-direction: column;
  }
  .row {
    display: flex;
    justify-content: center;
  }
  p {
    height: 3.88rem;
    font-size: 3rem;
    margin: 0;
    display: flex;
    justify-content: center;
    color: #303030;
    font-family: "Roboto", sans-serif;
  }

  span {
    font-size: 1.33rem;
    font-family: "Roboto", sans-serif;
    margin-bottom: 0.25rem;
  }
</style>
