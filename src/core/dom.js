class Dom {
	constructor(selector) {
		this.nativeElem =
			typeof selector === 'string' ?
			document.querySelector(selector) :
			selector
	}

	html(html) {
		if (typeof html === 'string') {
			this.nativeElem.innerHTML = html
			return this
		}
		return this.nativeElem.outerHTML.trim()
	}

	clear() {
		this.html('')
	}

	append(node) {
		if (node instanceof Dom) {
			node = node.nativeElem
		}

		if (Element.prototype.append) {
			this.nativeElem.append(node)
		} else {
			this.nativeElem.appendChild(node)
		}
	}

	on(eventType, callback) {
		this.nativeElem.addEventListener(eventType, callback)
	}

	off(eventType, callback) {
		this.nativeElem.removeEventListener(eventType, callback)
	}

	closest(selector) {
		return $(this.nativeElem.closest(selector))
	}

	getCoords() {
		return this.nativeElem.getBoundingClientRect()
	}

	get data() {
		return this.nativeElem.dataset
	}

	get style() {
		return this.nativeElem.style
	}

	focus() {
		this.nativeElem.focus()
		return this
	}

	id(parse) {
		if (parse) {
			const parsed = this.id().split(':')
			return {
				row: +parsed[0],
				col: +parsed[1],
			}
		}
		return this.data.id
	}

	find(selector) {
		const $el =
			typeof selector === 'string' ?
			this.nativeElem.querySelector(selector) :
			selector
		return $($el)
	}

	text(text) {
		if (typeof text === 'string') {
			this.nativeElem.textContent = text
			return
		}
		if (this.nativeElem.tagName.toLowerCase() === 'input') {
			return this.nativeElem.value.trim()
		}
		return this.nativeElem.textContent.trim()
	}

	findAll(selector) {
		return this.nativeElem.querySelectorAll(selector)
	}

	addClass(className) {
		this.nativeElem.classList.add(className)
		return this
	}

	removeClass(className) {
		this.nativeElem.classList.remove(className)
		return this
	}

	css(styles = {}) {
		Object
			.keys(styles)
			.forEach(key => {
				this.nativeElem.style[key] = styles[key]
			})
	}
}

export default function $(selector) {
	return new Dom(selector)
}

$.create = (tagName, ...classes) => {
	const el = document.createElement(tagName)
	if (classes) {
		el.classList.add(classes)
	}
	return $(el)
}
