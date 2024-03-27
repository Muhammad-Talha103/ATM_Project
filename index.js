#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
const balance = Math.floor(Math.random() * 10000);
let PinCode = 9001;
console.log(`PinCode Is => ${PinCode}`);
let answer = await inquirer.prompt([
    {
        type: "number",
        name: "userPin",
        message: "Enter Your PIN =>"
    },
]);
let { userPin } = answer;
if (userPin === PinCode) {
    console.log(chalk.green("WellCome To Atm"));
    let ans = await inquirer.prompt([
        {
            type: "list",
            name: "Accounttype",
            choices: ["Saving", "Current"],
            message: "Select Account Type => "
        },
        {
            type: "list",
            name: "transactiontype",
            choices: ["FastCash", "Withdraw", "Check Balance"],
            message: "Select Transaction Type => ",
            when(ans) {
                return ans.Accounttype;
            }
        },
        {
            type: "list",
            name: "amount",
            choices: [1000, 3000, 5000, 10000, 20000],
            message: "Select Your Amount => ",
            when(ans) {
                console.log(chalk.green(`Your Current Balance is ${balance}`));
                return ans.transactiontype === "FastCash";
            }
        },
        {
            type: "number",
            name: "amount",
            message: "Enter Your Amount Here => ",
            when(ans) {
                return ans.transactiontype === "Withdraw";
            }
        },
    ]);
    let Enteredammount = ans.amount;
    if (ans.transactiontype === "Check Balance") {
        console.log(balance);
    }
    else if (ans.transactiontype === "FastCash" || "Withdraw") {
        if (balance > Enteredammount) {
            const remainingbalance = balance - Enteredammount;
            console.log(chalk.green("Transaction Succesfully"));
            console.log(chalk.blue("Your Remaining Balance Is :", remainingbalance));
        }
        else {
            console.log(chalk.red("Insufficient Balance"));
        }
    }
}
else {
    console.log(chalk.red("Incorrect PinCode"));
}
