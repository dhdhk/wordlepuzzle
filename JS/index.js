const 정답 = "APPLE";
let attpemts = 0;
let index = 0;
let timer;

function appStart() {
  //로직
  const displayGameOver = () => {
    const div = document.createElement("div");
    div.innerText = "게임이 종료됐습니다";
    div.style =
      "diplay:flex; justify-content:center; align-items:center; position:absolute; top:40vh; left:45vw; font-size: 15px; background-color: #cbcbcb; width:150px; height:50px; border-radius: 20px; padding:40px 10px 10px 19px;";
    document.body.appendChild(div);
  };
  const nextLine = () => {
    if (attpemts === 6) return gameover();
    attpemts += 1;
    index = 0;
  };
  const gameover = () => {
    window.removeEventListener("keydown", handleKeyDown);
    displayGameOver();
    clearInterval(timer);
  };

  const handleEnter = () => {
    //정답확인
    let 맞은갯수 = 0;
    for (let i = 0; i < 5; i++) {
      const block = document.querySelector(
        `.board-block[data-index='${attpemts}${i}']`
      );
      const type = block.innerText;
      const answer = 정답[i];
      if (type === answer) {
        맞은갯수 += 1;
        block.style.background = "#6AAA64";
      } else if (정답.includes(type)) block.style.background = "#C9B458";
      else block.style.background = "#787C7E";
      block.style.color = "white";
    }
    if (맞은갯수 === 5) gameover();
    else nextLine();
  };

  const handleBackspace = () => {
    if (index > 0) {
      const preBlock = document.querySelector(
        `.board-block[data-index='${attpemts}${index - 1}']`
      );

      preBlock.innerText = "";
    }
    if (index !== 0) index -= 1;
  };
  const handleKeyDown = (event) => {
    const key = event.key.toUpperCase();
    const keyCode = event.keyCode;
    const thisBlock = document.querySelector(
      `.board-block[data-index='${attpemts}${index}']`
    );

    if (event.key === "Backspace") handleBackspace();
    if (index === 5) {
      if (event.key === "Enter") handleEnter();
      else return;
    } else if (65 <= keyCode && keyCode <= 90) {
      thisBlock.innerText = key;
      index += 1;
    }
  };
  const startTimer = () => {
    const 시작시간 = new Date();

    function setTime() {
      const 현재시간 = new Date();
      흐른시간 = new Date(현재시간 - 시작시간);

      const 분 = 흐른시간.getMinutes().toString();
      const 초 = 흐른시간.getSeconds().toString();
      const timeDiv = document.querySelector(".time");
      timeDiv.innerText = `time ${분.padStart(2, 0)} : ${초.padStart(2, 0)}`; //변수 사용가능
    }
    //주기성
    timer = setInterval(setTime, 1000);
  };

  startTimer();
  window.addEventListener("keydown", handleKeyDown);
}

appStart();
