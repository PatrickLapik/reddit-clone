import DottedStepTracker from '@/Components/DottedStepTracker';
import Modal from '@/Components/Modal';
import NavButton from '@/Components/NavButton';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import { useForm } from '@inertiajs/react';
import { PropsWithChildren, useEffect, useState } from 'react';
import CommunityBannerAndIcon from './Partials/CommunityBannerAndIcon';
import CommunityNameAndDescription from './Partials/CommunityNameAndDescription';

interface CommunityCreateProps extends PropsWithChildren {}

export default function CommunityCreateFormModal({
    children,
}: CommunityCreateProps) {
    const { data, setData, post, errors } = useForm({
        name: '',
        description: '',
        icon: '',
        banner: '',
    });

    const [currentStep, setCurrentStep] = useState(1);
    const [isCreatingOpen, setIsCreatingOpen] = useState(false);
    const [isChecked, setIsChecked] = useState(false);
    const totalSteps = 2;

    const isButtonDisabled = !isChecked || !!errors.name || !!errors.description;

    useEffect(() => {
        if (data.name.trim() === '') return;

        const delayDebounce = setTimeout(() => {
            checkUnique();
            setIsChecked(true);
        }, 500);

        return () => clearTimeout(delayDebounce);
    }, [data.name, data.description]);

    const checkUnique = () => {
        post(route('community.create.validate'));
    };

    const handleSubmit = () => {
        post(route('community.create'), {
            onFinish: () => handleAfterSubmit(),
        });
    };

    const handleAfterSubmit = () => {
        setIsCreatingOpen(false);
        setData({
            name: '',
            description: '',
            icon: '',
            banner: '',
        });
        setTimeout(() => {
            setCurrentStep(1);
        }, 500);
    };

    const nextStep = () => {
        if (currentStep < totalSteps) {
            setCurrentStep(currentStep + 1);
        } else {
            handleSubmit();
        }
    };

    const prevStep = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        }
    };

    return (
        <>
            <button className='w-full flex items-center justify-start cursor-pointer hover:bg-reddit-dark-secondary rounded-xl max-h-12 px-4 py-2.5' onClick={() => setIsCreatingOpen(true)}>
                {children}
            </button>
            <Modal
                show={isCreatingOpen}
                onClose={() => setIsCreatingOpen(false)}
            >
                <div className="h-full w-full">
                    {currentStep == 1 && (
                        <CommunityNameAndDescription
                            setData={setData}
                            data={data}
                            errors={errors}
                        />
                    )}
                    {currentStep == 2 && (
                        <CommunityBannerAndIcon
                            setData={setData}
                            data={data}
                            className="h-72"
                        />
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
                        <PrimaryButton
                            onClick={() => {
                                nextStep();
                            }}
                            disabled={isButtonDisabled}
                        >
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
