import { Aside, Header, Main } from '@ui/components/layout';
import { HeaderStyles, MainStyles } from '@ui/styles/layout';
import { DashboardStyles } from '@ui/styles/page';

export default function Dashboard() {
  return (
    <div className={DashboardStyles.Dashboard}>
      <Header className={HeaderStyles.Dashboard} />
      <Main className={MainStyles.Dashboard} />
      <Aside />
    </div>
  );
}
