import { Command } from "commander"
import { logCmd } from "./helper/log";
import cliSpinners from 'cli-spinners';
import inquirer from 'inquirer';
import { commandLineServer } from "./server-linux";
import { commandLineDocker } from "./docker";


enum OptionAction {
    ChooseGroupAction = "ChooseGroupAction"
}

const cmd = new Command();

async function run() {
    const optionGroup = await inquirer.prompt([{
        type: "list",
        message: "Fearture Option Group",
        name: OptionAction.ChooseGroupAction,
        choices: ["Setup Server", "Docker", "Code"]
    }]);

    switch (optionGroup[OptionAction.ChooseGroupAction]) {
        case "Setup Server":
            await commandLineServer()
            break;
        case "Docker":
            await commandLineDocker()
            break;
        case "Code":
            console.log("I will gen code for you ");
            break;
        default:
            break;
    }
}

run()

