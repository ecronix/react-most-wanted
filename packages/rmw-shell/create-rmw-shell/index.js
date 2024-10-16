#!/usr/bin/env node
const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

const projectName = process.argv[2] || "my-app";
const templatePath = path.resolve(__dirname, "template");
const fullPath = path.join(process.cwd(), projectName);

console.log("Using npm.\n");

// Create the new project directory
fs.mkdirSync(projectName);

// Copy all files from the template directory into the new project directory
const copyRecursiveSync = (src, dest) => {
  const files = fs.readdirSync(src);
  files.forEach((file) => {
    const srcPath = path.join(src, file);
    const destPath = path.join(dest, file);
    if (fs.lstatSync(srcPath).isDirectory()) {
      fs.mkdirSync(destPath);
      copyRecursiveSync(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  });
};

copyRecursiveSync(templatePath, projectName);

// Update package.json name field
const packageJsonPath = path.join(fullPath, "package.json");
let packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf8"));
packageJson.name = projectName;
fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));

console.log("\nInstalling dependencies:");

// List dependencies
if (packageJson.dependencies) {
  Object.keys(packageJson.dependencies).forEach((dep) => {
    console.log(`- ${dep}`);
  });
}

console.log("\nInstalling devDependencies:");

// List devDependencies
if (packageJson.devDependencies) {
  Object.keys(packageJson.devDependencies).forEach((dep) => {
    console.log(`- ${dep}`);
  });
}

// Run 'npm install' inside the new project directory
const originalDir = process.cwd();
process.chdir(fullPath);
try {
  execSync("npm install", { stdio: "inherit" });
} finally {
  process.chdir(originalDir);
}

console.log(`\nProject created successfully in ${projectName}.\n`);
