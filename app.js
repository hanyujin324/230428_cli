/* 1.CLI환경에서 입력을 받은 데이터가, html파일의 이름으로 사용된다.
2.html 파일의 기본요구사항
title 태그의 기본정보
body 태그의 자식으로서 최상위 div #root 태그 사용 유무 선택가능한 방식 
본문<p> 태그 내용작성
3. 위 abc 항을 모두 충족하는 형태의 CLI 입력을 모두 받고, 입력데이터를 기초데이터로 HTML파일이 /result 디렉토리에 생성(create) 
 */

//commander과 inquirer을 불러냄
const { program } = require("commander");
import inquirer from "inquirer";

const html = `
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
</head>
  <div id="root"></div> //만들지 안만들지 선택하게끔 수정
  <p>${p}</p>
<body>

</body>

</html>`;

// 1.타이틀을 생성하고 입력받은 값으로 타이틀로 한다.

// 2. div id가 root인 것을 1을 선택하면 만들어지고 2를 선택하면 만들어지지않게 한다.

// 3. p 태그를 생성하고 입력받은 값으로 p 내용을만든다.

// 4. 위에 만든 HTML 파일을 result 디렉토리에 생성하게 한다.

program.option();

// 타이틀 안에 들어갈 내용을 입력받음.

function titleMaker() {
  const { title } = inquirer.prompt([
    {
      type: "input",
      name: "title",
      message: "타이틀 이름을 적어주세요.",
    },
  ]);
}

inquirer
  .prompt([
    {
      type: "input",
      name: "name",
      message: "root를 만들겠습니까?",
      choices: [{ name: "만든다." }],
    },
  ])
  // 에러인 경우
  .catch((error) => {
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
