import { useCurrentQuery } from "../../app/serivices/auth";
import {Flex} from "antd";

export const Auth = ({ children }: { children: JSX.Element }) => {
  const { isLoading } = useCurrentQuery();

  if(isLoading) {
    return (
      <Flex justify={'center'} align={'center'} style={{height: '100%'}}>

        <img srcSet={"./logo512.png"} width={120} height={120} alt={''}
             style={{ animation: 'rotateAnimation 4s linear infinite' }}/>
      </Flex>
    )
  }

  return children
}
