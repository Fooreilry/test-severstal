import { Button } from 'antd';
import { ModalOrderCreateForm } from './ModalOrderCreateForm';
import { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';

export const ButtonOrderCreate = ({
  addOrder,
}: { addOrder: (order: Order) => void }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
      setIsModalOpen(true);
    };

    const closeModal = () => {
      setIsModalOpen(false);
    };
  return (
    <>
      <Button
        type="primary"
        icon={<PlusOutlined />}
        iconPosition="start"
        onClick={showModal}
      >
        Заказ
      </Button>
      <ModalOrderCreateForm
        open={isModalOpen}
        onClose={closeModal}
        addOrder={addOrder}
      />
    </>
  );
};
