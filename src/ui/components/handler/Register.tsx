'use client';

import { useRegister } from '@library/hooks';
import { Form, Input, Message } from '@ui/components/shared';

export default function Register() {
  const { formData, handleChange, handleSubmit, message, loading, fieldError } =
    useRegister();

  return (
    <Form
      method={handleSubmit}
      loading={loading}
    >
      {message && <Message>{message}</Message>}
      <Input
        type='email'
        id='email'
        label='Email'
        placeholder='your@email.here'
        value={formData.email}
        method={handleChange}
        fieldError={fieldError}
      />
      <Input
        type='password'
        id='password'
        label='Password'
        placeholder='<rgM_Xzv'
        value={formData.password}
        method={handleChange}
        fieldError={fieldError}
      />
      <Input
        type='password'
        id='confirmPassword'
        label='Confirm Password'
        placeholder='<rgM_Xzv'
        value={formData.confirmPassword}
        method={handleChange}
        fieldError={fieldError}
      />
      <Input
        type='submit'
        value='Register'
      />
    </Form>
  );
}
