import { FC } from 'react';
import cn from 'classnames';
import { CardListBlock as CardListBlockType } from '@/types/sanity';
import { DrawerListBlock } from '@/components/contentBlocks/DrawerListBlock';
import { ContentBlockWrapper } from '../ContentBlockWrapper';
import { Card } from './Card';
import {
  ONLY_SHOW_ON_DESKTOP,
  ONLY_SHOW_ON_TABLET_MOBILE,
  Wrapper,
  CardListWrapper,
} from './styles';

type Props = {
  cardListBlock: CardListBlockType;
};

export const CardListBlock: FC<Props> = ({ cardListBlock }) => {
  const { header, drawerListItems } = cardListBlock;

  return (
    <>
      {/* Render cards on desktop */}
      <div className={cn(ONLY_SHOW_ON_DESKTOP)}>
        <ContentBlockWrapper header={header}>
          <div className={cn(Wrapper)}>
            <div className={cn(CardListWrapper)}>
              {drawerListItems.map((card) => (
                <Card key={card._key} card={card} />
              ))}
            </div>
          </div>
        </ContentBlockWrapper>
      </div>
      {/* Render drawer on tablet and mobile */}
      <div className={cn(ONLY_SHOW_ON_TABLET_MOBILE)}>
        <DrawerListBlock drawerListBlock={cardListBlock} />
      </div>
    </>
  );
};
