'use client';

import { useLogin } from '@library/hooks';
import { Form, Input, Message } from '@ui/components/shared';

export default function Login() {
  const { formData, handleChange, handleSubmit, message, loading, fieldError } =
    useLogin();

  return (
    <Form
      method={handleSubmit}
      loading={loading}
    >
      {message && <Message>{message}</Message>}
      <Input
        type='email'
        placeholder='your@email.here'
        id='email'
        label='Email'
        value={formData.email}
        method={handleChange}
        fieldError={fieldError}
      />
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
        type='submit'
        value='Login'
      />
    </Form>
  );
}
