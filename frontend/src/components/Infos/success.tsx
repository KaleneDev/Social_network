import "./success.scss";

import { forwardRef } from "react";

interface SuccessProps {
    text: string;
}

const Success = forwardRef<HTMLDivElement, SuccessProps>(({ text }, ref) => {
    return (
        <div className="container-success" ref={ref}>
            <p className="success">{text}</p>
        </div>
    );
});

export default Success;
