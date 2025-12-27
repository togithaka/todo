'use client';

import { useRecover } from '@library/hooks';
import { Form, Input, Message } from '@ui/components/shared';

export default function Recover() {
  const { formData, handleChange, handleSubmit, message, loading, fieldError } =
    useRecover();

  return (
    <Form
      method={handleSubmit}
      loading={loading}
    >
      {message && <Message>{message}</Message>}
      <Input
        type='password'
        placeholder='<rgM_Xzv'
        id='password'
        label='Password'
        value={formData.password}
        method={handleChange}
        fieldError={fieldError}
      />
      <Input
        type='password'
        placeholder='<rgM_Xzv'
        id='confirmPassword'
        label='Confirm Password'
        value={formData.confirmPassword}
        method={handleChange}
        fieldError={fieldError}
      />
      <Input
        type='submit'
        value='Recover'
      />
    </Form>
  );
}
