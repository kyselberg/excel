const CODES = {
	A: 65,
	Z: 90,
}

function toCell(row) {
	return (_, col) => {
		return `
			<div 
				class="cell" 
				contenteditable="" 
				data-col="${col}"
				data-type="cell"
				data-id="${row}:${col}"
			></div>
		`
	}
}

function toColumn(col, index) {
	return `
		<div class="column" data-type="resizable" data-col="${index}">
			${col}
			<div class="col-resize" data-resize="col"></div>
		</div>
	`
}

function createRow(index, content) {
	const resizer =
		index ?
		'<div class="row-resize" data-resize="row"></div>' :
		''
	return `
		<div class="row" data-type="resizable">
			<div class="row-info">
				${ index ? index : '' }
				${ resizer }
			</div>
			<div class="row-data">${content}</div>
		</div>
	`
}

function toChar(_, i) {
	return String.fromCharCode(CODES.A + i)
}

export function createTable(rowsCount = 15) {
	const colsCount = CODES.Z - CODES.A + 1
	const cols = new Array(colsCount)
		.fill('')
		.map(toChar)
		.map(toColumn)
		.join('')
	const rows = []
	rows.push(createRow(null, cols))
	for (let row = 0; row < rowsCount; row++) {
		const cells = new Array(colsCount)
			.fill('')
			.map(toCell(row))
			.join('')
		rows.push(createRow(row + 1, cells))
	}
	return rows.join('')
}
