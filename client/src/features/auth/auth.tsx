import {useCurrentQuery} from "../../api/auth";
import {Flex} from "antd";


export const Auth = ({children}: { children: JSX.Element }) => {
  const {isLoading} = useCurrentQuery();
  
  if (isLoading) {
    return (
      <Flex justify={'center'} align={'center'} style={{height: '100vh'}}>
        <img
          className={"auth-loading"}
          srcSet={`${process.env.PUBLIC_URL}/logo192.png`}
          width={192}
          height={192}
          alt={'logo'}
        />
      </Flex>
    )
  }
  
  return children
}
