import { Header, Main } from '@ui/components/layout';
import { PageStyles } from '@ui/styles/page';

export default function Page() {
  return (
    <div className={PageStyles.Page}>
      <Header />
      <Main />
    </div>
  );
}
