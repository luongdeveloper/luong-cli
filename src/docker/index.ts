import { Command } from "commander"
import cliSpinners from 'cli-spinners';
import inquirer from 'inquirer';
import { dockerController } from "./DockerController";


const cmd = new Command();

enum OptionAction {
    ChooseFunction = "ChooseFunction"
}

export async function commandLineDocker() {
    const optionGroup = await inquirer.prompt([{
        type: "list",
        message: "Fearture Option with docker",
        name: OptionAction.ChooseFunction,
        choices: ["Install Docker", "Postgres", "MySql", "MongoDb"]
    }]);

    switch (optionGroup[OptionAction.ChooseFunction]) {
        case "Install Docker":
            await dockerController.setup()
            break;
        case "Postgres":
            break;
        case "MySql SLL":
            console.log("I will gen code for you ");
            break;
        case "MongoDb":
            console.log("I will gen code for you ");
            break;
        default:
            break;
    }
    return;
}

