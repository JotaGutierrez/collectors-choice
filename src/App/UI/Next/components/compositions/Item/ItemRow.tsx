import Item from '@Core/Item/domain/Item'
import { useRealmContext } from '../../../context/RealmContext'
import { TypographyMuted, TypographyP } from '../../atoms/Typography'
import TagSelect from '../Tag/TagsSelect'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Card, CardContent, CardFooter } from '@/components/ui/card'

interface props {
  rowKey: string;
  item: Item;
}

const ItemRow = ({ rowKey, item }: props) => {
  const realmContext = useRealmContext()

  return <Card
    key={rowKey}
  >
      <CardContent className={'py-4'} onClick={() => {
        realmContext?.hideRealmConfig()
        realmContext?.setActiveItem(item)
      }}>
        <div className={'flex flex-row justify-start items-center'}>
          <div className="pr-4">
            <Avatar>
              <AvatarFallback>{Array.from(item.name === '' ? 'I' : item.name)[0].toUpperCase()}</AvatarFallback>
            </Avatar>
          </div>
          <div>
            <TypographyP text={item.name} className="font-medium" />
            <TypographyMuted text={item.notes?.substring(0, 40)} className="" />
          </div>
        </div>
      </CardContent>
      {!!item?.tags &&
        <CardFooter>
          <TagSelect tags={item.tags} item={item} allowAdd={false}/>
        </CardFooter>
      }
  </Card>
}

export default ItemRow
