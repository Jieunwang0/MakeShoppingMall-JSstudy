import { Command } from "commander";
import open from "open";
import os from 'os';
import fs from 'fs';
import fetch from 'node-fetch'

const program = new Command();

program.name("My CLI").description("A little CLI to help my computer life");
const fileName = `${os.homedir()}/.cli-config.json`;
const CONFIG = JSON.parse(fs.readFileSync(fileName).toString());

program
    .command("todo")
    .description("Add a new todo to Things app")
    .argument("<todo>", "todo text to add")
    .option("-t, --today, is this for today?")
    .action((todo, options) => {
        let url = `things:///add?
    title=${encodeURIComponent(todo)}`;
        if (options.today) {
            url += "&when=today";
        }
        console.log({ url });
        open(url);
        console.log("todo!", { todo, options });
    });

program
    .command("discord")
    .description("Send a message to my personal discord server")
    .argument("<message>", "message to send")
    .action(async (message, options) => {
        console.log("sending message to discord!", message);
       const response = await fetch(CONFIG.discord_webhook, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                content: message,
            }),
        });
        console.log(response.status, response.statusText)
    });

program.parse();
