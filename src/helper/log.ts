import logUpdate from 'log-update';
import cliSpinners from 'cli-spinners';
import chalk from "chalk"
class  LogCmd {
    private intervalLog: any= null; 
    private nowText = ""; 
    async awaitTimeOut(x:number) {
        return new Promise(resolve => {
          setTimeout(() => {
            resolve(x);
          }, x);
        });
      }
    async start(params: {snippet : cliSpinners.Spinner, text: string}){
        this.nowText = params.text;
        this.clear();;
        let i = 0;

        this.intervalLog = setInterval(() => {
            const {frames} = params.snippet;
            logUpdate(frames[i = ++i % frames.length] + "  "+ params.text);
        }, 80);
    }
    async clear(){
        this.awaitTimeOut(80)
        clearInterval(this.intervalLog);
        this.intervalLog= null;
        logUpdate.clear()
    }
    
    async done(params ?: {text?: string}){
        await this.clear();
        console.log(chalk.green.bold("✓") + "  "+ (params?.text ?? this.nowText));
    }
    async fail(params ?: {text?: string}){
        await this.clear();
        console.log(chalk.red.bold("✖") + "  "+ (params?.text ?? this.nowText));
    }
    async warn(params ?: {text?: string}){
        await this.clear();
        console.log(chalk.yellow.bold("⚠") + "  "+ (params?.text ?? this.nowText));
    }
}

export const logCmd = new LogCmd(); 