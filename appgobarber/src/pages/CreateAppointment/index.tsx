import React from 'react';
import { useRoute } from '@react-navigation/native';

import { Container } from './styles';

const CreateAppointment: React.FC = () => {
  const route = useRoute();

  return <Container />;
};

export default CreateAppointment;
