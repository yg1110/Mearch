module.exports = {
    getURL: function(type){
        switch(type){
            case "상의":
                return "https://store.musinsa.com/app/clearance/lists?clearance_year=&clearance_month=&clearance_week=&d_cat_cd=001&brand=&sale_fr_rate=&sale_to_rate=&sort=pop_category&sub_sort=&page=1&list_kind=small&ex_soldout=&exclusive_yn=&price=&price1=&price2="
            case "바지":
                return "https://store.musinsa.com/app/clearance/lists?clearance_year=&clearance_month=&clearance_week=&d_cat_cd=003&brand=&sale_fr_rate=&sale_to_rate=&sort=pop_category&sub_sort=&page=1&list_kind=small&ex_soldout=&exclusive_yn=&price=&price1=&price2="
            case "아우터":
                return "https://store.musinsa.com/app/clearance/lists?clearance_year=&clearance_month=&clearance_week=&d_cat_cd=002&brand=&sale_fr_rate=&sale_to_rate=&sort=pop_category&sub_sort=&page=1&list_kind=small&ex_soldout=&exclusive_yn=&price=&price1=&price2="
            case "가방":
                return "https://store.musinsa.com/app/clearance/lists?clearance_year=&clearance_month=&clearance_week=&d_cat_cd=004&brand=&sale_fr_rate=&sale_to_rate=&sort=pop_category&sub_sort=&page=1&list_kind=small&ex_soldout=&exclusive_yn=&price=&price1=&price2="
            case "신발":
                return "https://store.musinsa.com/app/clearance/lists?clearance_year=&clearance_month=&clearance_week=&d_cat_cd=005&brand=&sale_fr_rate=&sale_to_rate=&sort=pop_category&sub_sort=&page=1&list_kind=small&ex_soldout=&exclusive_yn=&price=&price1=&price2="
            case "모자":
                return "https://store.musinsa.com/app/clearance/lists?clearance_year=&clearance_month=&clearance_week=&d_cat_cd=007&brand=&sale_fr_rate=&sale_to_rate=&sort=pop_category&sub_sort=&page=1&list_kind=small&ex_soldout=&exclusive_yn=&price=&price1=&price2="
        }
    },
    getArrayParser: function(array) {
        return array.toString().split("]").map(v=> v.trim().replace("[", "").split(" ")).slice(0, -1)
    },
}