
import { useRouter } from 'next/router';
import useSWR from 'swr';
import Item from '../../../../../../Core/Item/domain/Item';

const fetcher = (url, queryParams = '') => fetch(`${url}${queryParams}`).then(r => r.json());

const ItemListPresenter = ({tags, GroupRenderer, ItemRenderer, groupParams}) => {

    const properties = Array.isArray(tags) ? [... Array.from(new Set(tags.filter(tag => tag.group != '').map(tag => tag.group)))] : [];

    const { query } = useRouter();

    const { data, error } = useSWR(['/api/item/fetch', '?filter=' + query.filter + '&realm=' + query.realm], fetcher);

    if (error) return <div>Failed to load</div>
    if (data === undefined) return <div>Loading...</div>

    return <GroupRenderer properties={properties} params={groupParams}>{ data.map(function(item: Item, key: number) {
        return <ItemRenderer key={key} rowKey={key} item={item} tags={tags} properties={properties} />
    })}</GroupRenderer>
}

export default ItemListPresenter;
