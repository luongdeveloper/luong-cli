import { logCmd } from "../helper/log";
import cliSpinners from "cli-spinners"
import execSh from "exec-sh"
import { ngnixController } from "./Ngnix";
import fs from "fs"
import moment from "moment"
import inquirer from "inquirer"
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

    async addDomainSSL(): Promise<any> {
        const catDefault = await fs.readFileSync('/etc/nginx/sites-enabled/default', { encoding: "utf8" });
        await execShPro(`sudo mkdir /etc/nginx/sites-enabled/backup`).catch(err => null)
        console.log("on 46");
        await execShPro(`sudo cp /etc/nginx/sites-enabled/default /etc/nginx/sites-enabled/backup/backup${moment(new Date()).format("YYYY-MM-DD-hh-mm-ss")}`);
        console.log("on 48");


        const params = await inquirer.prompt([{
            type: "input",
            message: "Enter your domain",
            name: "domain",
        }, {
            type: "input",
            message: "Enter port running",
            name: "port",
        }])

        await execShPro(`sudo certbot --nginx -d ${params.domain} -d ${params.domain}`)
        console.log("on 62");

        const textAddServer = `
        \n\n#################################################
        server {
            index index.html index.htm index.nginx-debian.html;
            server_name ${params.domain}; # managed by Certbot
            if ($scheme != "https") {
        return 301 https://$host$request_uri;
            }
            location / {
        rewrite ^ $request_uri;
        rewrite ^/(.*) $1 break;
        return 400;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $remote_addr;
        proxy_pass    http://127.0.0.1:${params.port}/$uri;
            }
        
            listen [::]:443 ssl; # managed by Certbot
            listen 443 ssl; # managed by Certbot
            ssl_certificate /etc/letsencrypt/live/${params.domain}/fullchain.pem; # managed by Certbot
            ssl_certificate_key /etc/letsencrypt/live/${params.domain}/privkey.pem; # managed by Certbot
            include /etc/letsencrypt/options-ssl-nginx.conf; # managed by Certbot
            ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem; # managed by Certbot
        }
        `
        const contentAdd = catDefault + textAddServer;
        const scriptExec = `echo "${contentAdd.replace(/[$]/g, '\\$&')}" | sudo tee -a /etc/nginx/sites-enabled/default`
        console.log("on 91");
        await execShPro(scriptExec).catch(err => null)
        console.log("on 93");


        return Promise.resolve()
    }
}


export const sslController = new SSLController()