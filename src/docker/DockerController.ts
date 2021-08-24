import { logCmd } from "../helper/log";
import cliSpinners from "cli-spinners"
import execSh from "exec-sh"
const execShPro = execSh.promise;
class DockerController {
    async setup() {
        logCmd.start({
            snippet: cliSpinners.dots2,
            text: "Check docker"
        })
        await logCmd.awaitTimeOut(2000)
        logCmd.clear()
        const result = await execShPro(`sudo docker --version`).catch(err => null);
        if (!result) {
            await execShPro(`sudo apt-get update`).catch(err => null);
            await execShPro(`sudo apt-get install \
            apt-transport-https \
            ca-certificates \
            curl \
            gnupg \
            lsb-release`).catch(err => null);
            await execShPro(`sudo apt install curl`).catch(err => null);
            await execShPro(`curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg`).catch(err => null);
            await execShPro(`echo \
            "deb [arch=amd64 signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu \
            $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null`).catch(err => null);
            await execShPro(`sudo apt-get update`).catch(err => null);
            await execShPro(`sudo apt-get install docker-ce docker-ce-cli containerd.io`).catch(err => null);
            await execShPro(`sudo apt-cache madison docker-ce`).catch(err => null);
            logCmd.done({
                text: "Docker has installed"
            })
        } else {
            logCmd.done({
                text: "Docker is already installed"
            })
        }
        return
    }


}

export const dockerController = new DockerController()