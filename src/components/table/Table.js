import $ from '@core/dom'
import {ExcelComponent} from '@core/ExcelComponent'
import {
	isCell,
	matrix,
	nextSelector,
	shouldResize,
} from '@/components/table/table.functions'
import {TableSelection} from '@/components/table/TableSelection'
import {createTable} from '@/components/table/table.template'
import {resizeHandler} from '@/components/table/table.resize'


export class Table extends ExcelComponent {
	static className = 'excel__table'

	constructor($root, options) {
		super($root, {
			name: 'Table',
			listeners: ['mousedown', 'keydown', 'input'],
			...options,
		})
	}

	prepare() {
		this.selection = new TableSelection()
	}

	init() {
		super.init()
		this.selectCell(this.$root.find('[data-id="0:0"]'))
		this.$on('formula:input', text => {
			this.selection.current.text(text)
		})
		this.$on('formula:enter', () => {
			this.selection.current.focus()
		})
	}

	toHTML() {
		return createTable(20)
	}

	selectCell($cell) {
		this.selection.select($cell)
		this.$emit('table:select', $cell)
	}

	onMousedown(event) {
		if (shouldResize(event)) {
			resizeHandler(event, this.$root)
		} else if (isCell(event)) {
			const $target = $(event.target)
			if (event.shiftKey) {
				const $cells = matrix($target, this.selection.current)
					.map(id => this.$root.find(`[data-id="${id}"]`))
				this.selection.selectGroup($cells)
			} else {
				const $target = $(event.target)
				this.selection.select($target)
			}
		}
	}

	onInput(event) {
		this.$emit('table:input', $(event.target))
	}

	onKeydown(event) {
		const keys =[
			'Enter',
			'Tab',
			'ArrowUp',
			'ArrowRight',
			'ArrowLeft',
			'ArrowDown',
		]
		const {key} = event
		if (keys.includes(key) && !event.shiftKey) {
			event.preventDefault()
			const id = this.selection.current.id(true)
			const $next = this.$root.find(nextSelector(key, id))
			this.selectCell($next)
		}
	}
}
