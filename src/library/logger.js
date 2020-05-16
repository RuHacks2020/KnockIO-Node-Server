import chalk from 'chalk';

export function server(msg) {
  console.log(chalk.blue(`[SERVER] ${msg}`));
}

export function database(msg) {
  console.log(chalk.green(`[DATABASE] ${msg}`));
}

export function router(msg) {
  console.log(chalk.cyan(`[ROUTER] ${msg}`));
}

export function error(msg) {
  console.log(chalk.red(`[ERROR] ${msg}`));
}

export function warn(msg) {
  console.log(chalk.yellow(`[WARN] ${msg}`));
}