export function checkName(name: string) {
    switch (name) {
        case '巴萨':
            return '巴塞隆拿'
        case '皇马':
            return '皇家馬德里'
        case '西汉姆联':
            return '韋斯咸'
        case '切尔西':
            return '車路士'
        case '阿森纳':
            return '阿仙奴'
        case '尤文图斯':
            return '祖雲達斯'
        case '诺维奇':
            return '諾域治'
        case '吉马良斯':
            return '甘馬雷斯'
        case '巴黎圣日尔曼':
            return '巴黎聖日爾門'
        case '利兹联':
            return '列斯聯'
        case '西班牙人':
            return '愛斯賓奴'
        default:
            return name
    }
}