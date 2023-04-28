/* 1.CLI환경에서 입력을 받은 데이터가, html파일의 이름으로 사용된다.
2.html 파일의 기본요구사항
title 태그의 기본정보
body 태그의 자식으로서 최상위 div #root 태그 사용 유무 선택가능한 방식 
본문<p> 태그 내용작성
3. 위 abc 항을 모두 충족하는 형태의 CLI 입력을 모두 받고, 입력데이터를 기초데이터로 HTML파일이 /result 디렉토리에 생성(create)  
 */

//commander과 inquirer을 불러냄 +fs
const { program } = require("commander");
import inquirer from "inquirer";
import fs from "fs";

// html 생성
const htmlS = (titleName, rootMaker, pMaker) => `
<!DOCTYPE html>  
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${titleName}</title>
</head>
  <div id="root">
  <p>${pMaker}</p>
  </div> //rootMaker을 이용하여 만들지 안만들지 선택하게끔 수정
<body>

</body>

</html>`;

// 1.타이틀을 생성하고 입력받은 값으로 타이틀로 한다.
// const titleName=document.getElementById('')
document.title = { titleName };
// in에서 받은 값으로 이름을 설정한다.

// 2. div id가 root인 것을 1을 선택하면 만들어지고 2를 선택하면 만들어지지않게 한다.
// const rootM = create;
// if(만약에 아래에 있는 in으로 1을 받으면 루트를 만들게 한다.)
// else(만약 in으로 2를 받으면 루트가 생성되지않는다.)
function root(rootMaker) {
  if (rootMaker === 1) {
    let makeDiv = document.createElement("div");
    document.body.appendChild(makeDiv);
    makeDiv.setAttribute("id", "root");
  } else {
    console.log("루트를 만들지 않겠습니다");
  }
}

// 3. p 태그를 생성하고 입력받은 값으로 p 내용을만든다.
// 위에 있는 html구조처럼 입력받은 값을 p태그 안에 들어가서 화면에 보이게 만든다.

// 4. 위에 만든 HTML 파일을 result 디렉토리에 생성하게 한다.

program.option("-n, --number", "number").option("-s, ---string");
program.parse(process.argv);

// 타이틀 안에 들어갈 내용을 입력받음.
async function titleMaker() {
  const { titleName } = await inquirer.prompt([
    {
      type: "input",
      name: "titleName",
      message: "타이틀 이름을 적어주세요.",
    },
  ]);
}
// div id root를 만들지 입력받음
const { rootMaker } = await inquirer.prompt([
  {
    type: "list", //리스트 형식으로 1,2를 고를 수 있다.
    name: "rootMaker",
    message: "id가 root인 div를 만들건가요?",
    choices: [
      { name: "1. 만든다.", value: 1 },
      { name: "2. 안만든다.", value: 2 },
    ],
  },
]);
const { pMaker } = await inquirer.prompt([
  {
    type: "input",
    name: "pMaker",
    message: "p태그안에 들어갈 내용을 입력해주세요.",
  },
]);
titleMaker();

// fs로 위에 작성한 HTML파일을 result 디렉터리안에 넣는다.
const htmlMake = htmlS(titleMaker, rootMaker, pMaker);
fs.writeFileSync("./result", htmlMake);

// 아래는 이것저것 적은 코드이다.
// 에러인 경우
inquirer.catch((error) => {
  if (error.isError) {
    // 작성하기
  }
});

// 만든다고 했을 때 콘솔창에 '만든다'는 멘트가 보이게 한다.(실제로 만드는건 inquirer로 한다.) (필요 없을 듯)
const maker = program.command("yes");
maker.action(() => {
  console.log("만들었습니다.");
});
program.parse(process.argv);

/* 하려고 했던 것:
commander과 inquirer을 이용하여 html을 만든다. 
title의 이름을 받고 그 값으로 title이 보여진다.
div id가 root인 태그를 만들지 inquirer을 사용하여 list형식으로 1을 입력했다면 만들어지고 2를 입력했다면 생성되지않게 한다. p태그안에 들어갈 내용을 받고 입력받은 값을 태그안에 넣어 화면에 보이게 한다. 만들어진 html파일은 fs를 통해 result디렉터리로 생성이 된다 */
