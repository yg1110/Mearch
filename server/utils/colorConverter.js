
const conditions = [
    [0, 923202],
    [923202, 2535361],
    [2535361, 3371902],
    [3371902, 6799988],
    [6799988, 10507899],
    [10507899, 11981162],
    [11981162, 14282734],
    [14282734, 15697309],
    [15697309, 15945123],
    [15945123, 16072355],
    [16072355, 16443920],
    [16443920, 16777215]
]
    
function colorToHex(color) {
    const hexadecimal = color.toString(16)
    return hexadecimal.length === 1 ? `0${hexadecimal}` : hexadecimal
}

module.exports = {
    convertRGBtoHex: function(color) {
        return `#${colorToHex(parseInt(color[0]))}${colorToHex(parseInt(color[1]))}${colorToHex(parseInt(color[2]))}`
    },
    
    getColorCondition: function(color){
        return color.map(hex=>{
            const decimal = parseInt(hex.substring(1), 16);
            return conditions.findIndex(condition=>{
                const start = condition[0];
                const end = condition[1];
                return (decimal >= start && decimal <= end)
            })
        })
    }
}