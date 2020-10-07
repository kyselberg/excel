import {DomListener} from '@core/DomListener'


export class ExcelComponent extends DomListener {
	constructor($root, options = {}) {
		super($root, options.listeners)
		this.name = options.name || ''
		this.prepare()
		this.emitter = options.emitter
		this.unsubscribers = []
	}
	// настраиваем компонент до init
	prepare() {

	}
	// возвращаем шаблон компонента
	toHTML() {
		return ''
	}
	// уведомляем о событии event
	$emit(event, ...args) {
		this.emitter.emit(event, ...args)
	}
	// подписываемся на событие event
	$on(event, fn) {
		const unsub = this.emitter.subscribe(event, fn)
		this.unsubscribers.push(unsub)
	}

	// инициализируем компонент
	// добавляем слушатели
	init() {
		this.initDOMListeners()
	}
	// удаляем компонент
	// удаляем слушатели
	destroy() {
		this.removeDOMListeners()
		this.unsubscribers.forEach(unsub => unsub())
	}
}

