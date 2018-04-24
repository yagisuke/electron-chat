import { app } from 'electron'
import setAppMenu from './setAppMenu'
import createWindow from './createWindow'

app.on('ready', () => {
    setAppMenu()
    createWindow()
})

app.on('window-all-closed', () => {
    if (process.platform === 'darwin') return
    app.quit()
})

app.on('activate', (_e, hasVisibleWindows) => {
    if (hasVisibleWindows) return
    createWindow()
})