import { useUser } from "contexts/AuthContext";
import { useRouter } from "next/router";
const withGaurd = (WrappedComponent) => {
    return function Component(props) {
        const router = useRouter();
        const { user } = useUser();
        if (typeof window !== "undefined") {
            if (!user) {
                router.replace("/auth");
                return null;
            }
            return <WrappedComponent {...props} />;
        }
        return null;
    };
};
withGaurd.displayName = 'withGaurd';
export default withGaurd