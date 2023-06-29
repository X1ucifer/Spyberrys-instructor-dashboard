import { useLink } from "@refinedev/core";
import { Logo } from "./styled";
import { BikeWhiteIcon, FineFoodsIcon } from "components";
import { theme } from "antd";

const { useToken } = theme;

type TitleProps = {
    collapsed: boolean;
};

export const Title: React.FC<TitleProps> = ({ collapsed }) => {
    const { token } = useToken();
    const Link = useLink();

    return (
        <Logo>
            <Link to="/">
                {collapsed ? (
                    // <img src="/refine-collapsed.svg" alt="Refine" width="28px" />
                    <h2>S</h2>
                ) : (
                    // <img src="/refine.svg" alt="Refine" width="140px" />
                    <h2>Spyberrys</h2>
                )}
            </Link>
        </Logo>
    );
};
