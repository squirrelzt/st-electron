const { app, BrowserWindow, Menu, Tray } = require('electron')
const path = require('path')

// 保持对window对象的全局引用，如果不这么做的话，当JavaScript对象被
// 垃圾回收的时候，window对象将会自动的关闭
let win


function createWindow () {
    // 隐藏菜单栏
    Menu.setApplicationMenu(null);
    // 创建浏览器窗口。
    win = new BrowserWindow({
    width: 800,
    height: 600,
    // backgroundColor: '#2e2c29',
    center: true,
    resizable: false,
    movable: true,
    closable: true,
    alwaysOnTop: false,
    title: 'hello',
    // Boolean (可选) - 窗口是否可以进入全屏状态. 在 macOS上, 最大化/缩放按钮是否可用 默认值为 true
    fullscreenable: true,
    // Boolean (可选) - 窗口是否全屏. 当明确设置为 false 时，在 macOS 上全屏的按钮将被隐藏或禁用. 默认值为 false
    fullscreen: false,
    // Boolean (可选) - 是否在任务栏中显示窗口. 默认值为false
    skipTaskbar: false,
    // Boolean (可选) - 是否允许改变窗口的大小时, 大于屏幕的尺寸. 默认值为false
    enableLargerThanScreen: false,
    titleBarStyle: "hiddenInset",
    webPreferences: {
      nodeIntegration: true
    }
  })

  // 加载index.html文件
//   win.loadFile('index.html')
  win.loadFile('./pie/pie.html')
//   win.loadURL('https://www.baidu.com')

// let child = new BrowserWindow({ parent: win })

const tray = new Tray(path.join(__dirname, 'images', 'favicon.ico'))
tray.on('click', () => {
    win.isVisible() ? win.hide() : win.show()
  })
  win.on('show', () => {
    tray.setHighlightMode('always')
  })
  win.on('hide', () => {
    tray.setHighlightMode('never')
  })

  // 打开开发者工具
//   win.webContents.openDevTools()

  // 当 window 被关闭，这个事件会被触发。
  win.on('closed', () => {
    // 取消引用 window 对象，如果你的应用支持多窗口的话，
    // 通常会把多个 window 对象存放在一个数组里面，
    // 与此同时，你应该删除相应的元素。
    win = null
  })
}

// Electron 会在初始化后并准备
// 创建浏览器窗口时，调用这个函数。
// 部分 API 在 ready 事件触发后才能使用。
app.on('ready', createWindow)

// 当全部窗口关闭时退出。
app.on('window-all-closed', () => {
  // 在 macOS 上，除非用户用 Cmd + Q 确定地退出，
  // 否则绝大部分应用及其菜单栏会保持激活。
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // 在macOS上，当单击dock图标并且没有其他窗口打开时，
  // 通常在应用程序中重新创建一个窗口。
  if (win === null) {
    createWindow()
  }
})

// 在这个文件中，你可以续写应用剩下主进程代码。
// 也可以拆分成几个文件，然后用 require 导入。