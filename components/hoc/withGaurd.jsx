import { useUser } from "contexts/AuthContext";
import { useRouter } from "next/router";
import { SELLER_ROUTES } from "utils/constants";
const withGaurd = (WrappedComponent) => {
    return function Component(props) {
        const router = useRouter();
        const { user, currentUser } = useUser();    
        if (typeof window !== "undefined") {
            if (!user) {
                router.replace("/auth");
                return null;
            }
            if(SELLER_ROUTES.includes(router.pathname)){
                if(!currentUser){
                    router.replace("/become-a-seller");
                    return null;
                }
            }
            return <WrappedComponent {...props} />;
        }
        return null;
    };
};
withGaurd.displayName = 'withGaurd';
export default withGaurd