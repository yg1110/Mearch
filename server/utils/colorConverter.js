
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
  ['#ceef00', '#0D0D0E'],
  ['#0182f6', '#0D0D0E'],
  ['#ffea00', '#0D0D0E'],
  ['#ff7200', '#0D0D0E'],
  ['#ff00a1', '#0D0D0E'],
  ['#7f290c', '#0D0D0E'],
  ['#eee6c4', '#0D0D0E'],
  ['#b077cf', '#0D0D0E'],

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
        return COLORS[index]
    },
    getClothColorSet: function() {
        return CLOTHCOLORSET
    },
    setClothColorSet: function(top, bottom) {
        return CLOTHCOLORSET.push([top, bottom])
    },
}