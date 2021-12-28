import {Plugin} from 'obsidian'

import {TODO_VIEW_TYPE} from './constants'
import {DEFAULT_SETTINGS, TodoSettings, TodoSettingTab} from './settings'
import TodoListView from './view'

export default class TodoPlugin extends Plugin {
  private settings: TodoSettings

  get view() {
    return this.app.workspace.getLeavesOfType(TODO_VIEW_TYPE)[0]?.view as TodoListView
  }

  async onload() {
    await this.loadSettings()

    this.addSettingTab(new TodoSettingTab(this.app, this))
    this.addCommand({
      id: "show-checklist-view",
      name: "Open View",
      callback: () => {
        const views = this.app.workspace.getLeavesOfType(TODO_VIEW_TYPE)
        if (views.length === 0)
          this.app.workspace.getRightLeaf(false).setViewState({
            type: TODO_VIEW_TYPE,
            active: true,
          })
        else views[0].setViewState({ active: true, type: TODO_VIEW_TYPE })
      },
    })
    this.addCommand({
      id: "refresh-checklist-view",
      name: "Refresh List",
      callback: () => {
        this.view.refresh()
      },
    })
    this.registerView(TODO_VIEW_TYPE, (leaf) => {
      const newView = new TodoListView(leaf, this)
      return newView
    })

    if (this.app.workspace.layoutReady) this.initLeaf()
    else this.app.workspace.onLayoutReady(() => this.initLeaf())
  }

  initLeaf(): void {
    if (this.app.workspace.getLeavesOfType(TODO_VIEW_TYPE).length) return

    this.app.workspace.getRightLeaf(false).setViewState({
      type: TODO_VIEW_TYPE,
      active: true,
    })
  }

  async onunload() {
    this.app.workspace.getLeavesOfType(TODO_VIEW_TYPE)[0]?.detach()
  }

  async loadSettings() {
    const loadedData = await this.loadData()
    this.settings = { ...DEFAULT_SETTINGS, ...loadedData }
  }

  async updateSettings(updates: Partial<TodoSettings>) {
    Object.assign(this.settings, updates)
    await this.saveData(this.settings)
    this.view.refresh(true)
  }

  getSettingValue<K extends keyof TodoSettings>(setting: K): TodoSettings[K] {
    return this.settings[setting]
  }
}
