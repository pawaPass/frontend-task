import {FC, ReactNode} from 'react';
import Image from 'next/image';

import pawaMoneyLogo from '@/app/assets/pawamoney-logo.png';

interface LayoutProps {
    TopBar?: ReactNode;
    Footer?: ReactNode;
    children: ReactNode;
}
const Footer: FC = () => {
    return (
        <div className="flex w-full flex-col items-center bg-light-blue pb-6 pt-4">
            <Image src={pawaMoneyLogo} alt="pawaMoney logo" priority height={20} />
            <p className="mt-4 text-2xs text-blue-gray">© 2023</p>
        </div>
    );
};

const TopBar: FC = () => {
    return (
        <div className="flex h-12 flex-row items-start px-5">
            I'm the TopBar
        </div>
    );
};

const LayoutComponent = ({ TopBar, Footer, children }: LayoutProps) => (
    <div className="flex h-full w-full flex-col items-center overflow-y-auto overflow-x-hidden bg-light-blue">
        <div className="flex min-h-full w-full max-w-[550px] shrink-0 grow flex-col">
            <div className="flex shrink-0 grow flex-col">
                {TopBar}
                <div className="flex grow flex-col px-5 pb-10">
                    <div className="flex w-full grow flex-col items-start">{children}</div>
                </div>
            </div>
            {Footer}
        </div>
    </div>
);

const Layout = ({ TopBar, Footer }: Omit<LayoutProps, 'children'>) =>
    function Layout({ children }: { children: ReactNode }) {
        return (
            <LayoutComponent TopBar={TopBar} Footer={Footer}>
                {children}
            </LayoutComponent>
        );
    };

export default Layout({
    TopBar: <TopBar />,
    Footer: <Footer />
});