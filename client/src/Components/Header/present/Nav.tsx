import React, { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import { NavigationList, NavigationItem } from '../../../Styles/Header'
import { NAVIGATIONLIST } from '../../../Constants/Menu'

const Nav:FC = () => {
  const navigate = useNavigate()
  const onChangePage = (e:React.MouseEvent<HTMLLIElement>) => {
    const li = e.target as HTMLLIElement

    console.log(li.innerText)

    switch (li.innerText) {
      case '목록보기': {
        navigate('/')
        break
      }
      case '목록 업데이트': {
        navigate('/updateproduct')
        break
      }
      case '조합 선택하기': {
        navigate('/selectcloset')
        break
      }
      case '조합 추가하기': {
        navigate('/makecloset')
        break
      }
      default: {
        break
      }
    }
  }

  return (
    <NavigationList>
      {NAVIGATIONLIST.map((menu:string) => (
        <NavigationItem
          key={menu}
          onClick={e => onChangePage(e)}
        >
          {menu}
        </NavigationItem>
      ))}
    </NavigationList>
  )
}
export default React.memo(Nav)
