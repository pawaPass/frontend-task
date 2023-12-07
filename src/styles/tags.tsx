import {ReactNode} from "react";

export const semibold = (chunks: ReactNode) => <span className="font-semibold">{chunks}</span>;
export const nonBreaking = (chunks: ReactNode) => chunks?.toString().replaceAll(' ', '\xa0');
export const lineBreak = () => <br />;
