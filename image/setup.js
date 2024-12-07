const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

// Key press codes for arrow keys
const KEYBOARD = {
  ENTER: '\x0D',
  ARROW_DOWN: '\x1b[B',
  ARROW_UP: '\x1b[A',
  ARROW_LEFT: '\x1b[D',
  ARROW_RIGHT: '\x1b[C',
};

const child = spawn('npm', ['create', 'serenity', '--yes'], { stdio: 'pipe' });

let answerIndex = 0;
let outputBuffer = '';

function handlePrompt() {
  if (outputBuffer.includes("What would you like to name your project?") && answerIndex === 0) {
    child.stdin.write(`app\n`);
    answerIndex++;
  }

  if (outputBuffer.includes("What branch of SerenityJS would you like to use?") && answerIndex === 1) {
    if (process.env.SERENITY_BRANCH !== "LATEST") {
      child.stdin.write(KEYBOARD.ARROW_DOWN);
    }
    child.stdin.write(KEYBOARD.ENTER);
    answerIndex++;
  }

  if (outputBuffer.includes("What project format would you like to scaffold?") && answerIndex === 2) {
    child.stdin.write(KEYBOARD.ARROW_DOWN);
    child.stdin.write(KEYBOARD.ENTER);
    answerIndex++;
  }

  if (outputBuffer.includes("Which package manager would you like to use?") && answerIndex === 3) {
    child.stdin.write(KEYBOARD.ENTER);
    answerIndex++;
  }
}

// Listen to the output of the process
child.stdout.on('data', (data) => {
  outputBuffer += data.toString();
  console.log(data.toString());

  // Try to handle the prompt
  handlePrompt();
});

// Handle errors in the process
child.stderr.on('data', (data) => {
  console.error(`stderr: ${data}`);
});

// Handle process exit
child.on('close', (code) => {
  console.log(`Process exited with code ${code}`);

  // Move files after the process completes
  const currentDir = process.cwd();
  const appDir = path.join(currentDir, 'app');

  // Check if the app directory exists
  if (fs.existsSync(appDir)) {
    // Read all the files inside the 'app' directory
    fs.readdir(appDir, (err, files) => {
      if (err) {
        console.error('Error reading app directory:', err);
        return;
      }

      // Move each file from the 'app' directory to the current working directory
      files.forEach((file) => {
        const sourcePath = path.join(appDir, file);
        const destPath = path.join(currentDir, file);

        fs.rename(sourcePath, destPath, (err) => {
          if (err) {
            console.error(`Error moving file ${file}:`, err);
          } else {
            console.log(`Moved file: ${file}`);
          }
        });
      });
    });
  } else {
    console.log(`'app' directory does not exist at ${appDir}`);
  }
});
