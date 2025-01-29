import CommunityBanner from '@/Components/CommunityBanner';
import CommunityDescription from '@/Components/CommunityDescription';
import { CommunityProvider } from '@/Contexts/CommunityContext';
import DefaultLayout from '@/Layouts/DefaultLayout';

export default function Community() {
    return (
        <DefaultLayout>
            <CommunityProvider>
                <div className="flex flex-col items-center justify-center">
                    <div className="flex h-screen w-[1120px] flex-col px-4">
                        <CommunityBanner />
                        <div className="flex w-full flex-row">
                            <div className="w-full"></div>
                            <CommunityDescription />
                        </div>
                    </div>
                </div>
            </CommunityProvider>
        </DefaultLayout>
    );
}
