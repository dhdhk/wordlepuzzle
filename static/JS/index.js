const 정답 = "APPLE";
let attpemts = 0;
let index = 0;
let timer;

function appStart() {
  //로직
  //게임오버 표시 창
  const displayGameOver = () => {
    const div = document.createElement("div");
    div.innerText = "게임이 종료됐습니다";
    div.style =
      "diplay:flex; justify-content:center; align-items:center; position:absolute; top:40vh; left:45vw; font-size: 15px; background-color: #cbcbcb; width:150px; height:50px; border-radius: 20px; padding:40px 10px 10px 19px;";
    document.body.appendChild(div);
  };
  // 엔터 눌렀을 때 다음 줄로 넘어가게 하기
  const nextLine = () => {
    if (attpemts === 6) return gameover();
    attpemts += 1;
    index = 0;
  };
  //게임 오버(끝내기)
  const gameover = () => {
    window.removeEventListener("keydown", handleKeyInput);
    displayGameOver();
    clearInterval(timer);
  };
  //엔터눌렀을때
  const handleEnter = () => {
    //정답확인
    let 맞은갯수 = 0;
    for (let i = 0; i < 5; i++) {
      const block = document.querySelector(
        `.board-block[data-index='${attpemts}${i}']`
      );
      const type = block.innerText;
      const answer = 정답[i];
      //첫번째 글자와 정답의 첫번째 글자 대조하기
      if (type === answer) {
        맞은갯수 += 1;
        block.style.background = "#6AAA64";
      } else if (정답.includes(type)) block.style.background = "#C9B458";
      else block.style.background = "#787C7E";
      block.style.color = "white";
      changeBackgroundColor(type);
      animation(block);
    }
    if (맞은갯수 === 5) gameover();
    else nextLine();
  };
  //백스페이스 키 눌렀을 때 이전 박스의 내용 지우기
  const handleBackspace = () => {
    if (index > 0) {
      const preBlock = document.querySelector(
        `.board-block[data-index='${attpemts}${index - 1}']`
      );

      preBlock.innerText = "";
    }
    if (index !== 0) index -= 1;
  };
  //키보드 입력값 받기
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
  //엔터쳤을 때 실행되는 배경 색 바꾸기
  const changeBackgroundColor = (type) => {
    const typeBlock = document.querySelector(`.type-block[data-key='${type}']`);
    typeBlock.style.backgroundColor = "gray";
  };
  // 타이머 시작하기
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
  // 엔터쳤을 때 실행되는 애니메이션
  const animation = (block) => {
    block.classList.add("rotate");
    setTimeout(() => {
      block.classList.remove("rotate");
    }, 1000);
  };
  // 자판 div 변수선언
  const typeBlocks = document.querySelectorAll(".type-block");

  //typeBlocks를 각각 클릭했을 때의 이벤트 받기
  typeBlocks.forEach((typeBlock) => {
    typeBlock.addEventListener("click", () => {
      const mouse = typeBlock.getAttribute("data-key");
      console.log(mouse);
      handleMouseInput(mouse);
    });
  });

  //키다운과 같이 클릭의 입력값 받기
  const handleMouseInput = (mouse) => {
    const thisBlock = document.querySelector(
      `.board-block[data-index='${attpemts}${index}']`
    );
    if (mouse === "Backspace") handleBackspace();
    if (index === 5) {
      if (mouse === "Enter") handleEnter();
      else return;
    } else if (/^[A-Z]$/.test(mouse)) {
      thisBlock.innerText = mouse;
      index += 1;
    }
  };
  startTimer();
  window.addEventListener("keydown", handleKeyDown);
}

appStart();
