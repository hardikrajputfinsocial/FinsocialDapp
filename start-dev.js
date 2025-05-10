const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  dim: '\x1b[2m',
  underscore: '\x1b[4m',
  blink: '\x1b[5m',
  reverse: '\x1b[7m',
  hidden: '\x1b[8m',
  fg: {
    black: '\x1b[30m',
    red: '\x1b[31m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    magenta: '\x1b[35m',
    cyan: '\x1b[36m',
    white: '\x1b[37m',
  },
  bg: {
    black: '\x1b[40m',
    red: '\x1b[41m',
    green: '\x1b[42m',
    yellow: '\x1b[43m',
    blue: '\x1b[44m',
    magenta: '\x1b[45m',
    cyan: '\x1b[46m',
    white: '\x1b[47m',
  },
};

const frontendDir = path.join(__dirname, 'FinsocialDapp');
const backendDir = path.join(__dirname, 'backend');

// Check if directories exist
if (!fs.existsSync(frontendDir)) {
  console.error(`${colors.fg.red}Frontend directory not found: ${frontendDir}${colors.reset}`);
  process.exit(1);
}

if (!fs.existsSync(backendDir)) {
  console.error(`${colors.fg.red}Backend directory not found: ${backendDir}${colors.reset}`);
  process.exit(1);
}

// Function to start a process with colored output
function startProcess(command, args, cwd, name, color) {
  console.log(`${color}Starting ${name}...${colors.reset}`);
  
  const proc = spawn(command, args, {
    cwd,
    shell: true,
    stdio: 'pipe',
  });

  proc.stdout.on('data', (data) => {
    console.log(`${color}[${name}] ${colors.reset}${data.toString().trim()}`);
  });

  proc.stderr.on('data', (data) => {
    console.error(`${color}[${name}] ${colors.reset}${data.toString().trim()}`);
  });

  proc.on('close', (code) => {
    console.log(`${color}${name} process exited with code ${code}${colors.reset}`);
  });

  return proc;
}

// Start the frontend (Next.js) server
const frontendProc = startProcess(
  'npx', 
  ['next', 'dev'], 
  frontendDir, 
  'Frontend', 
  colors.fg.green
);

// Start the backend (FastAPI) server
const backendProc = startProcess(
  'uvicorn', 
  ['api.login_api:app', '--reload', '--port', '8000'], 
  backendDir, 
  'Backend', 
  colors.fg.cyan
);

// Handle process termination
process.on('SIGINT', () => {
  console.log('\nShutting down development servers...');
  frontendProc.kill();
  backendProc.kill();
  process.exit(0);
});

console.log(`${colors.bright}${colors.fg.yellow}\nDevelopment servers started!${colors.reset}`);
console.log(`${colors.fg.green}Frontend: http://localhost:3000${colors.reset}`);
console.log(`${colors.fg.cyan}Backend API: http://localhost:8000${colors.reset}`);
console.log(`${colors.fg.yellow}Press Ctrl+C to stop both servers${colors.reset}\n`);
