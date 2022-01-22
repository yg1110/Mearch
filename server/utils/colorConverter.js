
const COLORS = [
  '#ffffff',
  '#8b8b8b',
  '#000000',
  '#ff0100',
  '#ff00a1',
  '#e9a399',
  '#ff7200',
  '#ffea00',
  '#ceef00',
  '#5b5a35',
  '#0182f6',
  '#7f290c',
  '#b077cf',
  '#c84a36',
  '#e59600',
  '#1e4380',
]


const CLOTHCOLORSET = [
  ['#ceef00', '#000000'],
  ['#0182f6', '#000000'],
  ['#ffea00', '#000000'],
  ['#ff7200', '#000000'],
  ['#ff00a1', '#000000'],
  ['#7f290c', '#000000'],
  ['#eee6c4', '#000000'],
  ['#b077cf', '#000000'],

  ['#0182f6', '#5b5a35'],
  ['#ffea00', '#5b5a35'],
  ['#ff00a1', '#5b5a35'],
  ['#ceef00', '#5b5a35'],
  ['#eee6c4', '#5b5a35'],

  ['#ceef00', '#1e4380'],
  ['#ff00a1', '#1e4380'],
  ['#0182f6', '#1e4380'],
  ['#eee6c4', '#1e4380'],
  ['#b077cf', '#1e4380'],

  ['#5b5a35', '#eee6c4'],
  ['#0182f6', '#eee6c4'],
  ['#ff0100', '#eee6c4'],
  ['#b077cf', '#eee6c4'],

  ['#0182f6', '#8b8b8b'],
  ['#eee6c4', '#8b8b8b'],
  ['#1e4380', '#8b8b8b'],
  ['#7f290c', '#8b8b8b'],

  ['#ff7200', '#c84a36'],
  ['#8b8b8b', '#c84a36'],
  ['#5b5a35', '#c84a36'],
]

module.exports = {
    getColor: function(index) {
        return colors[index]
    },
    getClothColorSet: function() {
        return CLOTHCOLORSET
    },
}