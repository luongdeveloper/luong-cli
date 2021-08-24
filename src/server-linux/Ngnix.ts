import { logCmd } from "../helper/log";
import cliSpinners from "cli-spinners"
import execSh from "exec-sh"
const execShPro = execSh.promise;
class Ngnix {
    async setup() {
        logCmd.start({
            snippet: cliSpinners.dots2,
            text: "Check ngnix exits"
        })
        await logCmd.awaitTimeOut(2000)
        logCmd.clear()
        const result = await execShPro(`sudo service nginx start`).catch(err => null);
        if (!result) {
            const result = await execShPro(`sudo apt-get install nginx`).catch(err => null);
        }
        logCmd.start({
            snippet: cliSpinners.dots2,
            text: "Start Ngnix"
        })
        await execShPro(`sudo killall apache2`).catch(err => null);
        await execShPro(`sudo service nginx start`)
        logCmd.done()
        logCmd.done({
            text: "ngnix is ​​installed"
        })
        return
    }
}

export const ngnixController = new Ngnix()