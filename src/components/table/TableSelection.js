export class TableSelection {
	static className = 'selected'

	constructor() {
		this.group = []
		this.current = null
	}

	clear() {
		this.group.forEach($el => $el.removeClass(TableSelection.className))
		this.group.splice(0)
	}

	select($el) {
		this.clear()
		this.group.push($el)
		$el.focus().addClass(TableSelection.className)
		this.current = $el
	}

	selectGroup($group =[]) {
		this.clear()
		this.group = $group
		this.group.forEach(el => el.addClass(TableSelection.className))
	}
}
