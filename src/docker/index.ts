import { Command } from "commander"
import cliSpinners from 'cli-spinners';
import inquirer from 'inquirer';
import { dockerController } from "./DockerController";



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
            dockerController.installPostgres()
            break;
        case "MySql":
            console.log("I will install MySQL for you, but not now ");
            break;
        case "MongoDb":
            console.log("I will install MySQL for you, but not now");
            break;
        default:
            break;
    }
    return;
}

