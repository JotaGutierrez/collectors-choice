import { Autosave } from "react-autosave";
import { useState } from "react";

const Page = ({item}) => {

    const [itemNotes, setItemNotes] = useState(item.notes);

    const saveDescription = async event => {
        const res = await fetch('/api/item/patch', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              _id: item._id,
              notes: event,
            }),
          });
    };

    return <>
        <textarea defaultValue={item.notes} onChange={(e) => setItemNotes(e.target.value)}></textarea>
        <Autosave data={itemNotes} onSave={saveDescription}></Autosave>
    </>
}

export default Page;
