import { PlusIcon } from '@heroicons/react/solid';

const InputButton = ({name, placeholder, extraClassses = "mt-1 mb-2 pb-6"}) =>
    <div className={"inline-flex " + extraClassses}>
        <input
            id={name}
            name={name}
            className="inline-block focus:ring-1 focus:ring-slate-200 rounded-l
                        focus:outline-none appearance-none w-full h-10 text-sm
                        text-slate-900 placeholder-slate-400 py-0 pl-10 ring-1
                        ring-slate-200 shadow-sm"
            type="text"
            aria-label={placeholder}
            placeholder={placeholder}
        />
        <button type='submit' className='rounded-r inline-block bg-black h-10 w-10'>
            <PlusIcon className="h-5 w-5 text-white m-auto"></PlusIcon>
        </button>
    </div>

export default InputButton;
