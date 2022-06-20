const canvas = document.querySelector('canvas')
const context = canvas.getContext('2d')
const value_x = 50
const value_y = 25;
const div = document.querySelector('div')
const list =  new Array(value_x).fill(new Array(value_y).fill(false)).map(i => i.map((i, index) => {
  if (Math.random() < 0.1) return true;
  return false;
}))
const {
  width,
  height,
  left,
  top: top_pos
} = canvas.getBoundingClientRect()

const warning_pos = []
context.beginPath();

context.rect(left, top_pos, width - 10, height - 10)
context.lineWidth = 1;
context.stroke();
context.closePath()
list.forEach((i, index_1) => {
  i.forEach((i, index_2) => {
    if (i) {
      context.beginPath()
      context.rect(left + index_1 * (width / value_x), top_pos + index_2 * (height / value_y), (width / value_x), (height / value_y))
      context.fill()
      context.closePath()
      warning_pos.push({
        start_x: left + index_1 * (width / value_x),
        start_y: top_pos + index_2 * (height / value_y),
        end_x: left + index_1 * (width / value_x) + width / value_x,
        end_y: top_pos + index_2 * (height / value_y) + height / value_y

      })
    }


  })

})
document.addEventListener('keydown', function(e) {
  let {
    top: top_pos,
    left
  } = window.getComputedStyle(div)
  switch (String.fromCharCode(e.keyCode).toLowerCase()) {
    case "w":
      div.style.top = parseInt(top_pos) - 10 + 'px';
      break;

    case "s":
      div.style.top = parseInt(top_pos) + 10 + 'px';
      break;

    case "a":
      div.style.left = parseInt(left) - 10 + 'px';
      break;

    case "d":
      div.style.left = parseInt(left) + 10 + 'px';
      break;
  }
  top_pos = parseFloat(window.getComputedStyle(div).top)
  left = parseFloat(window.getComputedStyle(div).left)
  document.querySelector("h1").textContent = (context.getImageData(left, top_pos, 1, 1).data[3] !== 0 ? "On black rect" : "Not on black rect")
})
