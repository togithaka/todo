'use client';

import { useReset } from '@library/hooks';
import { Form, Input, Message } from '@ui/components/shared';

export default function Reset() {
  const { formData, handleChange, handleSubmit, message, loading, fieldError } =
    useReset();

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
        type='submit'
        value='Reset'
      />
    </Form>
  );
}
