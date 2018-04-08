import { app } from 'electron'
import createWindow from './createWindow'

app.on('ready', () => {
    createWindow()
})

app.on('window-all-closed', () => {
    if (process.platform === 'drawin') return
    app.quit()
})

app.on('activate', (_e, hasVisibleWindows) => {
    if (hasVisibleWindows) return
    createWindow()
})