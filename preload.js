const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  sendContentToAI: (content) => ipcRenderer.send('send-content-to-ai', content),
  receiveAIResponse: (callback) => ipcRenderer.on('ai-response', (event, response) => callback(response)),
  openSettingsWindow: () => ipcRenderer.send('open-settings-window'),
  saveApiKey: (apiKey) => ipcRenderer.send('save-api-key', apiKey),
  getApiKey: () => ipcRenderer.invoke('get-api-key'),
  onApiKeySaved: (callback) => ipcRenderer.on('api-key-saved', (event, message) => callback(message))
});


