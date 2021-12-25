module.exports = {
    getURL: function(typeIndex, colorIndex){
        const prefix = "https://search.musinsa.com/category/"
        const middle = "?d_cat_cd=001&brand=&rate=&page_kind=search&list_kind=small&sort=sale_high&sub_sort=3m&page=1&display_cnt=90&sale_goods=&group_sale=&ex_soldout=&color="
        const suffix = "&price1=&price2=&exclusive_yn=&shoeSizeOption=&tags=&campaign_id=&timesale_yn=&q=&includeKeywords=&measure="
        const type = ["001", "003", "002", "005", "004", "007"]
        const color = [
            // 흰색, 아이보리
            '1%2C23',
            // 은색, 라이트그레이, 회색, 다크그레이
            '13%2C24%2C3%2C25',
            // 검정색
            '2',
            // 딥레드, 빨간색
            '51%2C11',
            // 라즈베리, 네온핑크, 분홍색
            '50%2C47%2C10',
            // 라이트 핑크, 폐일핑크, 피치
            '45%2C48%2C55',
            // 코랄, 라이트오렌지, 네온오렌지, 오렌지핑크, 주황색
            '5%2C52%2C54%2C53%2C46%2C12',
            // 라이트옐로우, 노란색, 머스타드
            '44%2C9%2C43',
            // 금색, 네오그린, 라이트그린, 민트, 녹색
            '14%2C33%2C31%2C32%2C6',
            // 올리브그린, 카키, 다크그린
            '34%2C30%2C35',
            // 스카이블루, 네온블루, 파란색, 네이비
            '37%2C38%2C7%2C36',
            // 자주, 버건디, 갈색
            '41%2C49%2C4',
            // 라벤더, 보라색, 다크바이올렛
            '39%2C8%2C40',
            // 로즈골드, 레드브라운
            '56%2C27',
            // 카키베이지, 카멜, 샌드, 베이지색
            '28%2C26%2C29%2C5',
            // 데님, 연청, 중청, 진청, 흑청
            '16%2C57%2C58%2C59%2C60'
        ]
        return prefix + type[typeIndex] + middle + color[colorIndex] + suffix;
    },
    getArrayParser: function(array) {
        return array.toString().split("]").map(v=> v.trim().replace("[", "").split(" ")).slice(0, -1)
    },
}
// https://search.musinsa.com/category/005?d_cat_cd=005&brand=&rate=&page_kind=search&list_kind=small&sort=pop&sub_sort=&page=1&display_cnt=90&sale_goods=&group_sale=&ex_soldout=&color=39%2C8%2C40&price1=&price2=&exclusive_yn=&shoeSizeOption=&tags=&campaign_id=&timesale_yn=&q=&includeKeywords=&measure=