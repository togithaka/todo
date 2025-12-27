import { Message } from '@components/shared';
import { InputStyles } from '@styles/shared';
import { InputHTMLAttributes } from 'react';

interface Props {
  type: InputHTMLAttributes<HTMLInputElement>['type'];
  id?: string;
  label?: string;
  placeholder?: string;
  value?: string;
  method?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  className?: string;
  textarea?: boolean;
  rows?: number;
  disabled?: boolean;
  fieldError?: { field: string; message: string };
}

export default function Input({
  type,
  id,
  label,
  placeholder,
  value,
  method,
  className,
  textarea,
  rows,
  disabled,
  fieldError,
}: Props) {
  const errorMessage =
    fieldError?.field === id ? fieldError?.message : undefined;

  return (
    <div
      className={[
        errorMessage && InputStyles.Error,
        InputStyles.Input,
        className,
      ].join(' ')}
    >
      {label && <label htmlFor={id}>{label}</label>}
      {textarea ? (
        <textarea
          id={id}
          placeholder={placeholder}
          value={value}
          onChange={(e) => method?.(e)}
          rows={rows || 3}
          disabled={disabled}
          style={{ fontFamily: 'inherit' }}
        />
      ) : (
        <input
          type={type}
          id={id}
          placeholder={placeholder}
          value={value}
          onChange={method}
          disabled={disabled}
          style={{ fontFamily: 'inherit' }}
        />
      )}
      {errorMessage && <Message>{errorMessage}</Message>}
    </div>
  );
}
