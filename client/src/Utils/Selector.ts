// 엘리먼트 검색함수
export function $(key: string, elemnent?: HTMLElement) {
  if (!elemnent) {
    return document.querySelector(key) as HTMLElement
  }
  return elemnent.querySelector(key) as HTMLElement
}
