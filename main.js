const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const isDev = !app.isPackaged;

let mainWindow;
let loginWindow;

function createMainWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    backgroundColor: "white",
    icon: "./icon.jpg",
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
      preload: path.join(__dirname, "preload.js"),
    },
  });

  isDev && mainWindow.webContents.openDevTools();
  mainWindow.loadFile("index.html");

  mainWindow.on("closed", () => {
    mainWindow = null;
  });
}

app.whenReady().then(createMainWindow);

function createLoginWindow() {
  loginWindow = new BrowserWindow({
    width: 600,
    height: 600,
    modal: true,
    show: false,
    parent: mainWindow,
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
      webSecurity: false,
      preload: path.join(__dirname, "preload.js"),
    },
  });

  isDev && loginWindow.webContents.openDevTools();

  loginWindow.loadFile("login.html"); // Load your login page or create a React component for login

  loginWindow.once("ready-to-show", () => {
    loginWindow.show();
  });

  loginWindow.on("closed", () => {
    loginWindow = null;
  });
}

ipcMain.on("openLoginWindow", () => {
  if (!loginWindow) {
    createLoginWindow(); // Open login window if it's not already open
  }
});

ipcMain.on("closeLoginWindow", (event, data) => {
  // Logic to close the login modal window

  console.log("Closing Login Window");
  const { username, password } = data;
  console.log(data);

  if (loginWindow) {
    loginWindow.close();
  }
});

ipcMain.on("attemptLogin", (event, data) => {
  console.log("attempl login main");
  console.log(data);
  // Simulate login validation (replace with your actual authentication logic)
  const { username, password } = data;
  if (username === "your_username" && password === "your_password") {
    event.reply("loginResult", "success"); // Send success message back to renderer
    if (loginWindow) {
      loginWindow.close(); // Close the login window upon successful login
    }
    // Perform actions upon successful login if needed
  } else {
    event.reply("loginResult", "failure"); // Send failure message back to renderer
    // Handle login failure
  }
});

ipcMain.on("loginSuccessful", (event, args) => {
  // Handle the successful login event received from the renderer process
  console.log(`Login successful for user: ${args.username}`);
  // Perform additional actions after successful login if needed
  // For example: update UI, set user session, etc.
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createMainWindow();
  }
});
