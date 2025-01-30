import CommunityBanner from '@/Components/CommunityBanner';
import CommunityDescription from '@/Components/CommunityDescription';
import { CommunityProvider } from '@/Contexts/CommunityContext';
import DefaultLayout from '@/Layouts/DefaultLayout';

export default function Community() {
    return (
        <DefaultLayout>
            <CommunityProvider>
                <CommunityBanner />
                <div className="flex w-full flex-row">
                    <div className="w-full"></div>
                    <CommunityDescription />
                </div>
            </CommunityProvider>
        </DefaultLayout>
    );
}
