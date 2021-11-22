
module.exports = {
    getURL: function(){
        return "https://store.musinsa.com/app/clearance/lists?clearance_year=&clearance_month=&clearance_week=&d_cat_cd=&brand=&sale_fr_rate=&sale_to_rate=&sort=pop_category&sub_sort=&page=1&list_kind=small&ex_soldout=&exclusive_yn=&price=&price1=&price2="
    },
    getArrayParser: function(array) {
        return array.toString().split("]").map(v=> v.trim().replace("[", "").split(" ")).slice(0, -1)
    },
    colorToRGB: function(color){
        return {R:parseInt(color[0]), G:parseInt(color[1]), B:parseInt(color[2])}
    }
}