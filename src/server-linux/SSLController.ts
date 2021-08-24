import { logCmd } from "../helper/log";
import cliSpinners from "cli-spinners"
import execSh from "exec-sh"
import { ngnixController } from "./Ngnix";
const execShPro = execSh.promise;
class SSLController {
    async setup() {
        logCmd.start({
            snippet: cliSpinners.dots2,
            text: "Starting install SSL"
        })
        await ngnixController.setup()
        await logCmd.awaitTimeOut(2000)
        logCmd.clear()
        const checkVersion = await execShPro(`sudo certbot --version`).catch(err => null);
        if (!checkVersion) {
            await execShPro(`sudo apt-add-repository -r ppa:certbot/certbot`).catch(err => null);
            await execShPro(`sudo apt-get update`).catch(err => null);
            await execShPro(`sudo apt install curl`).catch(err => null);
            await execShPro(`curl -o- https://raw.githubusercontent.com/luongdeveloper/sh/main/setup-ssl | bash`).catch(err => null);
            await execShPro(`sudo apt install python3-certbot-nginx`).catch(err => null);
            logCmd.done({ text: "Install certbot SSL successy" })
        } else {
            logCmd.done({ text: "SLL certbot has installer" })
        }
        logCmd.start({
            snippet: cliSpinners.dots2,
            text: "Start Ngnix"
        });

        await execShPro(`sudo killall apache2`).catch(err => null);
        await execShPro(`sudo service nginx start`)
        logCmd.done()
        logCmd.done({
            text: "All start success"
        })
        return
    }

    addDomainSSL(params: { domain: string, port: number }): Promise<any> {
        //todo 
        return Promise.resolve()
    }
}

export const sslController = new SSLController()