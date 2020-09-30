import $ from '@core/dom'

export function resizeHandler(event, $root) {
	const $resizer = $(event.target)
	const $parent = $resizer.closest('[data-type="resizable"]')
	const coords = $parent.getCoords()
	const type = $resizer.data.resize
	const sideProp = type === 'col' ? 'bottom' : 'right'
	$resizer.css({
		[sideProp]: '-2000px',
	})

	let value

	document.onmousemove = e => {
		if (type === 'col') {
			const delta = e.pageX - coords.right
			value = coords.width + delta
			$resizer.css({right: -delta + 'px'})
		} else {
			const delta = e.pageY - coords.bottom
			value = coords.height + delta
			$resizer.css({bottom: -delta + 'px'})
		}
	}

	document.onmouseup = () => {
		document.onmousemove = null
		document.onmouseup = null
		if (type === 'col') {
			$root.getAll(`[data-col="${$parent.data.col}"]`)
				.forEach(el => el.style.width = value + 'px')
		} else {
			$parent.css({height: value + 'px'})
		}
		$resizer.css({
			bottom: 0,
			right: 0,
		})
	}
}
