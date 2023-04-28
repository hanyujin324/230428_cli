// const fs = require("fs");
// const inquirer = require("inquirer");
import inquirer from "inquirer";
import fs from "fs";
const { program } = require("commander");

// 결과 파일을 저장할 폴더 경로
const RESULT_DIR = "./result";

// HTML 템플릿
const htmlTemplate = (title, createRootDiv, pContent) => `
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
</head>

<body>
  ${createRootDiv ? '<div id="root"></div>' : ""}
  <p>${pContent}</p>
</body>

</html>
`;

// HTML 파일 생성 함수
async function createHtmlFile() {
  // 타이틀 입력
  const { title } = await inquirer.prompt([
    {
      type: "input",
      name: "title",
      message: "HTML 파일의 제목을 입력하세요:",
    },
  ]);

  // root div 생성 여부 입력
  const { createRootDiv } = await inquirer.prompt([
    {
      type: "confirm",
      name: "createRootDiv",
      message: "HTML 파일에 <div id='root'></div> 태그를 생성하시겠습니까?",
      default: false,
    },
  ]);

  // p 태그 내용 입력
  const { pContent } = await inquirer.prompt([
    {
      type: "input",
      name: "pContent",
      message: "HTML 파일에 들어갈 <p> 태그 내용을 입력하세요:",
    },
  ]);

  // HTML 파일 생성
  const htmlContent = htmlTemplate(title, createRootDiv, pContent);
  const filePath = `${RESULT_DIR}/${title}.html`;
  fs.writeFileSync(filePath, htmlContent);

  console.log(`${filePath} 파일이 생성되었습니다.`);
}

// Commander 옵션 설정
program
  .option("-n, --number", "숫자 옵션")
  .option("-s, --string <value>", "문자열 옵션");

// 명령 실행
program.parse(process.argv);

// Commander 옵션에 따라 동작 수행
if (program.number) {
  console.log("숫자 옵션이 설정되었습니다.");
}

if (program.string) {
  console.log(`문자열 옵션 값: ${program.string}`);
}

// HTML 파일 생성 함수 호출
createHtmlFile();
