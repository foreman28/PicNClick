import {useCurrentQuery} from "../../api/auth";


export const Auth = ({children}: { children: JSX.Element }) => {
  const {isLoading} = useCurrentQuery();

  if (isLoading) {
    return <></>
  }

  return children
}
