import { useCurrentQuery } from "../../app/services/auth";
import {Flex} from "antd";

export const Auth = ({ children }: { children: JSX.Element }) => {
  const { isLoading } = useCurrentQuery();

  if(isLoading) {
    return (
      <Flex justify={'center'} align={'center'} style={{height: '100vh'}}>

        <img srcSet={"/logo.svg"} width={120} height={120} alt={'logo'}
             style={{ animation: 'rotateAnimation 4s linear infinite' }}/>
      </Flex>
    )
  }

  return children
}
