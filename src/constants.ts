export const TODO_VIEW_TYPE = 'todo'

export const LOCAL_SORT_OPT = {
  numeric: true,
  ignorePunctuation: true,
}

// 时间管理四象限任务优先级等级
export const PRIORITY_LEVEL = {
  lowest: 0,   // 不重要也不紧急：普通优先级+3天后到期/无到期时间
  option: 1,   // 不重要但紧急：普通优先级+3天内到期
  planning: 2, // 重要不紧急：高优先级+3天后到期/无到期时间
  immediate: 3 // 重要且紧急：高优先级+3天内到期
}

// Tasks 插件的相关图标
export const TASKS_EMOJI_DEADLINE_DATE = '📅'
export const TASKS_EMOJI_COMPLETE_DATE = '✅'
export const TASKS_EMOJI_HIGHEST_PRIORITIES = [ '🔺' ]