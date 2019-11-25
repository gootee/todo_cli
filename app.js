const readline = require('readline');
const fs = require('fs');

const banner = `Welcome to Todo CLI!\n` +
  `--------------------\n`
const menu = ` (v) View • (n) New • (cX) Complete • (dX) Delete • (q) Quit\n\n`
const checkMark = '\u2713'
let todos = [];

const interface = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

interface.question(banner + menu, 
  (answer) => {
    processCommand(answer)
  }
)

const processCommand = (answer) => {
  let nextQuestion = menu;
  switch (answer.substr(0, 1)) {
    case "n":
      nextQuestion = "What?\n\n"
      interface.question(nextQuestion, (answer) => processCommand("|" + answer))
      nextQuestion = "\n" + menu
      break;
    case "|":
      todos.push({
        status: "new",
        description: answer.substr(1)
      })
      break;
    case `v`:
      view();
      break;
    case `d`:
        todos.splice(parseInt(answer.substr(1, 1)), 1);
        break;
    case "q":
      console.log("\n\nSee you soon!  " + "\uD83D\uDE00")
      process.exit()
    case "c":
      complete(answer.substr(1));
      break;
    default:
  }    
  interface.question(nextQuestion, (answer) => processCommand(answer))
}  

const complete = (todoIndex) => {
  todos[todoIndex].status = "completed";
  console.log(`Completed ${todos[todoIndex].description}`)
}

const view = () => {
  if (todos.length > 0) {
    let display = '';
    for (let n = 0; n < todos.length; n++) {
      display += 
        "\n" +
        n.toString() +
        " " +
        `[${todos[n].status === 'completed' ? checkMark : ' '}]` +
        " " +
        todos[n].description
    }
    console.log(display + '\n\n');    
  } else {
    console.log("List is empty...")
  }

}
