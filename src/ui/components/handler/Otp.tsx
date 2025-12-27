'use client';

import { useOtp } from '@library/hooks';
import { Form, Input, Message } from '@ui/components/shared';

export default function Otp() {
  const { formData, handleChange, handleSubmit, message, loading, fieldError } =
    useOtp();

  return (
    <Form
      method={handleSubmit}
      loading={loading}
    >
      {message && <Message>{message}</Message>}
      <Input
        type='text'
        placeholder='3DYRLM'
        id='otp'
        label='OTP'
        value={formData.otp}
        method={handleChange}
        fieldError={fieldError}
      />
      <Input
        type='submit'
        value='Submit'
      />
    </Form>
  );
}
