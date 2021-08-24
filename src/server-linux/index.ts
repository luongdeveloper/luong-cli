import { Command } from "commander"
import cliSpinners from 'cli-spinners';
import inquirer from 'inquirer';
import { ngnixController } from "./Ngnix";
import { sslController } from "./SSLController";

const cmd = new Command();

enum OptionAction {
    ChooseFunction = "ChooseFunction"
}

export async function commandLineServer() {
    const optionGroup = await inquirer.prompt([{
        type: "list",
        message: "Fearture Option",
        name: OptionAction.ChooseFunction,
        choices: ["Install Ngnix", "Install SSL", "Add SLL"]
    }]);

    switch (optionGroup[OptionAction.ChooseFunction]) {
        case "Install Ngnix":
            await ngnixController.setup()
            break;
        case "Install SSL":
            await sslController.setup()
            break;
        case "Add SLL":
            console.log("I will gen code for you ");
            break;
        default:
            break;
    }
    return;
}

