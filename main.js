const { app, BrowserWindow, ipcMain, Menu } = require('electron');
const path = require('path');
const Store = require('electron-store');
const AIService = require('./ai-service');

// Inicializar o store
const store = new Store();
const aiService = new AIService();

let mainWindow;
let settingsWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
    }
  });

  mainWindow.loadFile('index.html');
  
  // Remover o menu padrão
  Menu.setApplicationMenu(null);
  
  // Abrir DevTools apenas em desenvolvimento
  if (process.env.NODE_ENV === 'development') {
    mainWindow.webContents.openDevTools();
  }
}

function createSettingsWindow() {
  if (settingsWindow) {
    settingsWindow.focus();
    return;
  }

  settingsWindow = new BrowserWindow({
    width: 500,
    height: 400,
    parent: mainWindow,
    modal: true,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
    }
  });

  settingsWindow.loadFile('settings.html');
  
  settingsWindow.on('closed', () => {
    settingsWindow = null;
  });
}

// Manipuladores IPC
ipcMain.on('send-content-to-ai', async (event, content) => {
  try {
    const apiKey = store.get('gemini-api-key');
    
    if (!apiKey) {
      event.reply('ai-response', 'Erro: Chave API do Gemini não configurada. Acesse as configurações para inserir sua chave API.');
      return;
    }

    aiService.initialize(apiKey);
    const response = await aiService.generateResponse(content);
    event.reply('ai-response', response);
  } catch (error) {
    console.error('Erro ao processar solicitação da IA:', error);
    event.reply('ai-response', `Erro: ${error.message}`);
  }
});

ipcMain.on('open-settings-window', () => {
  createSettingsWindow();
});

ipcMain.on('save-api-key', (event, apiKey) => {
  store.set('gemini-api-key', apiKey);
  event.reply('api-key-saved', 'Chave API salva com sucesso!');
});

ipcMain.handle('get-api-key', () => {
  return store.get('gemini-api-key', '');
});

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});


