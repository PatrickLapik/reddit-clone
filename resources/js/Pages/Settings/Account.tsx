import Modal from '@/Components/Modal';
import SettingsButton from '@/Components/SettingsButton';
import SettingsSection from '@/Components/SettingsSection';
import SettingsLayout from '@/Layouts/SettingsLayout';
import { PageProps } from '@/types';
import { usePage } from '@inertiajs/react';
import { useState } from 'react';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';

export default function Edit({
    mustVerifyEmail,
    status,
}: PageProps<{ mustVerifyEmail: boolean; status?: string }>) {
    const user = usePage().props.auth.user;

    const [activeModal, setActiveModal] = useState<
        null | 'updatingEmail' | 'updatingPassword' | 'deletingAccount'
    >(null);

    const handleModal = (
        modalName:
            | null
            | 'updatingEmail'
            | 'updatingPassword'
            | 'deletingAccount',
    ) => {
        setActiveModal(modalName);
    };
    return (
        <SettingsLayout title='Account'>
            <SettingsSection sectionTitle="General">
                <SettingsButton
                    title="Email address"
                    value={user.email}
                    onClick={() => handleModal('updatingEmail')}
                />
                <SettingsButton
                    title="Password"
                    value={''}
                    onClick={() => handleModal('updatingPassword')}
                />
            </SettingsSection>
            <SettingsSection sectionTitle="Advanced">
                <SettingsButton
                    title="Delete account"
                    value={''}
                    onClick={() => handleModal('deletingAccount')}
                />
            </SettingsSection>
            <Modal
                show={activeModal === 'updatingEmail'}
                onClose={() => handleModal(null)}
            >
                    <UpdateProfileInformationForm
                        mustVerifyEmail={mustVerifyEmail}
                        status={status}
                    />
            </Modal>
            <Modal
                show={activeModal === 'updatingPassword'}
                onClose={() => handleModal(null)}
            >
                    <UpdatePasswordForm />
            </Modal>
            <Modal
                show={activeModal === 'deletingAccount'}
                onClose={() => handleModal(null)}
            >
                    <DeleteUserForm />
            </Modal>
        </SettingsLayout>
    );
}
