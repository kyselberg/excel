export class Emitter {
	constructor() {
		this.listeners = {}
	}
	// уведомляем слушателей если есть
	emit(event, ...args) {
		if (!Array.isArray(this.listeners[event])) {
			return false
		}
		this.listeners[event].forEach(listener => {
			listener(...args)
		})
		return true
	}
	// добавляем нового слушателя
	subscribe(event, fn) {
		this.listeners[event] = this.listeners[event] || []
		this.listeners[event].push(fn)
		return () => {
			this.listeners =
				this.listeners.filter(listener => listener !== fn)
		}
	}
}
