import React, { HTMLAttributes } from 'react'

import * as S from './styles'

const Container: React.FC<HTMLAttributes<HTMLDivElement>> = ({
  children,
  ...rest
}) => {
  return <S.Wrapper {...rest}>{children}</S.Wrapper>
}

export default Container
