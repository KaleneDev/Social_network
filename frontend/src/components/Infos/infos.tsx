import "./infos.scss";

import { forwardRef } from "react";

interface InfosProps {
    text: string;
    color: string;
}

const Success = forwardRef<HTMLDivElement, InfosProps>(
    ({ text, color }, ref) => {
        return (
            <div className={`container-infos ${color}`} ref={ref}>
                <p className="infos">
                    {text} 
                </p>
            </div>
        );
    }
);

export default Success;
