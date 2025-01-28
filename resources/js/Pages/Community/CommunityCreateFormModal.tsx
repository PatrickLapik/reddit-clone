import DottedStepTracker from '@/Components/DottedStepTracker';
import Modal from '@/Components/Modal';
import NavButton from '@/Components/NavButton';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import { useForm } from '@inertiajs/react';
import { PropsWithChildren, useState } from 'react';
import CommunityBannerAndIcon from './Partials/CommunityBannerAndIcon';
import CommunityNameAndDescription from './Partials/CommunityNameAndDescription';

interface CommunityCreateProps extends PropsWithChildren {}

export default function CommunityCreateFormModal({
    children,
}: CommunityCreateProps) {
    const { data, setData } = useForm({
        name: '',
        description: '',
        icon: '',
        banner: '',
    });

    console.log(data.icon)

    const [currentStep, setCurrentStep] = useState(1);
    const [isCreatingOpen, setIsCreatingOpen] = useState(false);
    const totalSteps = 2;

    const nextStep = () => {
        if (currentStep < totalSteps) {
            setCurrentStep(currentStep + 1);
        }
    };

    const prevStep = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        }
    };

    return (
        <>
            <NavButton onClick={() => setIsCreatingOpen(true)}>
                {children}
            </NavButton>
            <Modal
                show={isCreatingOpen}
                onClose={() => setIsCreatingOpen(false)}
            >
                <div className="h-full w-full">
                    {currentStep == 1 && (
                        <CommunityNameAndDescription
                            setData={setData}
                            data={data}
                        />
                    )}
                    {currentStep == 2 && (
                        <CommunityBannerAndIcon setData={setData} data={data} className='h-72' />
                    )}
                </div>
                <div className="mt-6 flex items-end justify-between">
                    <DottedStepTracker
                        total={totalSteps}
                        active={currentStep}
                    />

                    <div className="flex items-center justify-end space-x-2">
                        <SecondaryButton onClick={prevStep}>
                            Back
                        </SecondaryButton>
                        <PrimaryButton onClick={nextStep}>
                            {currentStep == totalSteps
                                ? 'Create Community'
                                : 'Next'}
                        </PrimaryButton>
                    </div>
                </div>
            </Modal>
        </>
    );
}
