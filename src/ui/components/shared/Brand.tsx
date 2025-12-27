import { Icon } from '@ui/components/shared';
import { BrandStyles } from '@ui/styles/shared';

export default function Brand() {
  return (
    <div className={BrandStyles.Brand}>
      <Icon
        name='logo'
        alt='Todo'
        size={28}
      />
      <p>Todo</p>
    </div>
  );
}
