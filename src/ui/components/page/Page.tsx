import { Header, Main } from '@ui/components/layout';
import { HeaderStyles, MainStyles } from '@ui/styles/layout';
import { PageStyles } from '@ui/styles/page';

export default function Page() {
  return (
    <div className={PageStyles.Page}>
      <Header className={HeaderStyles.Page} />
      <Main className={MainStyles.Page} />
    </div>
  );
}
