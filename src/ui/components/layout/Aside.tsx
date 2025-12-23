import { AsideStyles } from '@ui/styles/layout';

export default function Aside() {
  return (
    <aside className={AsideStyles.Aside}>
      <div className={AsideStyles.Container}>
        <div className={AsideStyles.Head}>
          <div className={AsideStyles.Nav}></div>
        </div>
        <div className={AsideStyles.Body}></div>
      </div>
      <div className={AsideStyles.Cover}></div>
    </aside>
  );
}
