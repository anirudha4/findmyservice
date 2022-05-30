import { useUser } from "contexts/AuthContext";
import { useRouter } from "next/router";
const withAdmin = (WrappedComponent) => {
    return function Component(props) {
        const { currentUser } = useUser();
        const router = useRouter();
        if (typeof window !== "undefined") {
            if (!currentUser?.isAdmin) {
                router.replace("/");
                return null;
            }
            return <WrappedComponent {...props} />;
        }
        return null;
    };
};
withAdmin.displayName = 'withAdmin';
export default withAdmin