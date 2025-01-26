import Modal from '@/Components/Modal';
import SettingsButton from '@/Components/SettingsButton';
import SettingsSection from '@/Components/SettingsSection';
import SettingsLayout from '@/Layouts/SettingsLayout';
import { useState } from 'react';
import UploadAvatarForm from './Partials/UploadAvatarForm';

export default function Edit() {

    const [activeModal, setActiveModal] = useState<null | 'uploadAvatar'>(null);

    const handleModal = (modalName: null | 'uploadAvatar') => {
        setActiveModal(modalName);
    };
    return (
        <SettingsLayout title="Profile">
            <SettingsSection sectionTitle="General">
                <SettingsButton
                    title="Profile picture"
                    value={''}
                    onClick={() =>
                        setActiveModal('uploadAvatar')
                    }
                />
            </SettingsSection>
            <Modal
                show={activeModal === 'uploadAvatar'}
                onClose={() => handleModal(null)}
            >
                <UploadAvatarForm setState={setActiveModal}/>
            </Modal>
        </SettingsLayout>
    );
}
