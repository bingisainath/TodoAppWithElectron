// const { ipcRenderer, contextBridge } = require("electron");

// contextBridge.exposeInMainWorld("electron", {
//   notificationApi: {
//     sendNotification(message) {
//       ipcRenderer.send("notify", message);
//     },
//   },
// });

const { contextBridge, ipcRenderer } = require("electron");

// Exposing select Electron APIs to the renderer process
contextBridge.exposeInMainWorld("electron", {
  sendToMain: (channel, data) => {
    console.log("Send to Main", channel, " data :", data);
    ipcRenderer.send(channel, data);
  },
  receiveFromMain: (channel, func) => {
    ipcRenderer.on(channel, (_, ...args) => func(...args));
  },
  notificationApi: {
    sendNotification(message) {
      ipcRenderer.send("notify", message);
    },
  },
  login: {
    openLoginWindow() {
      ipcRenderer.send("openLoginWindow");
    },
    closeLoginWindow(data) {
      ipcRenderer.send("closeLoginWindow",data);
    },
    onLoginSuccess(callback) {
      ipcRenderer.on("loginSuccessful", (event, args) => {
        callback(args); // Callback to handle login success
      });
    },
  },
});
